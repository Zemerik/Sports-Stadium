require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const app = express();

app.listen(3000, () => {
  console.log("Project is running!");
})

const axios=require ('axios')
const Discord = require("discord.js");
const { Client,Util, Collection,Structures,CommandInteraction,ButtonInteraction,MessageButton,MessageEmbed,WebhookClient,MessageActionRow, MessageSelectMenu  , Modal, TextInputComponent} = require("discord.js");
const client = new Discord.Client({

 intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES","GUILD_MEMBERS","GUILD_MESSAGE_REACTIONS"],
  restRequestTimeout:40000
})

const messageCreate =require("./functions/messageCreate")

//error Tracker

const hook = new WebhookClient({ url: process.env.debughook})
//const logger = require('./Loggers.js')
  const err_chnl = process.env['error_channel']
    
//error Tracker 


client
	.on('rateLimit', err => {
			let embed = new MessageEmbed()
				.setTitle(`⛔ • Ratelimited!`)
        .setDescription("Bot Restarting...")
		
				.setColor("RED")

			hook.send({embeds:[embed]})
		})
  
	//.on('warn', info => client.logger.warn(`info \n` + info))
// .on('debug', info => {
  // hook.send({content: info+"sus"})
 //})


//command handler
const fs = require("fs");

const prefix = "ss"
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new
Discord.Collection()
client.categories = fs.readdirSync("./commands");
  // For category  
fs.readdirSync("./commands/").forEach((direc) => {
const commands = fs.readdirSync(`./commands/${direc}`).filter(file => file.endsWith(".js"))
for(file of commands) {
  const commandName = file.split(".")[0]
  let command = require(`./commands/${direc}/${commandName}`)
  client.commands.set(commandName, command)
  
  if(command.aliases) {
    command.aliases.forEach(alias => {
      client.aliases.set(alias, command)
    })
  }
  }  
})

//anti ratelimit 
client.on('debug', (a)=>{ if(a.startsWith(`Hit a 429`)){ process.kill(1) } }); 

client.on("rateLimit", data => { process.kill(1) }) 

client.on('rateLimited', () => { process.kill(1); }); 

let sent = false;
let sent2 = false;
client.on ("messageCreate", async (message) => { 
if ( message.content.startsWith ( prefix ) ) { 
  const args = message.content.slice(prefix.length).trim().split(/ +/g) 
  const commandName = args.shift()
  const command =    client.commands.get(commandName) ||
client.aliases.get(commandName)

  if(!command) return
  command.run(client, message, args)
}
})

const { bot_token } = require("./config.json")
const mongo_url = "mongodb+srv://EconomyBot:sports_stadium@economybot.p4huhyk.mongodb.net/?retryWrites=true&w=majority"
const { readdirSync } = require("fs");

const path = require('node:path');

const commandsPath = path.join(__dirname, './commands/economy');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.slashCommands.set(command.data.name, command);
}

client.cooldowns = new Collection();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1_000);
            return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
        }
    }

	timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});    
 
client.on('ready', async () => {
  console.log(`${client.user.tag} is online`)
client.user.setActivity(`${client.guilds.cache.size} Servers & ${client.guilds.cache.reduce(
			(a, b) => a + b.memberCount,
			0
		)} Members`, { type: "LISTENING" })
          })
//login and error handler
/* Connect to discord and mongodb */
client.login(bot_token).then(() => mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}))
//crash handler

process.on("unhandledRejection", (reason, p) => {
 console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
 console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
 console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
 console.log(type, promise, reason);
  process.kill(1)
});

messageCreate(client, Discord);
