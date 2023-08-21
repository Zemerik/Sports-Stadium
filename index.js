const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello World!");
}) 

const db = require("quick.db");
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

process.on('unhandledRejection', (reason, promise) => {
	const channel = client.channels.cache.find(c => c.id === err_chnl)

  
if (reason.stack.includes("DiscordAPIError: Unknown Message")) return;

if (reason.stack.includes("DiscordAPIError: Missing Access")) return;  

if (reason.stack.includes("DiscordAPIError: Unknown Webhook")) return;  

if (reason.stack.includes("DiscordAPIError: Invalid Webhook Token")) return;  
  
if (reason.stack.includes("DiscordAPIError: Missing Permissions")) return;  
  
	const embed = new MessageEmbed()
		.setTitle(`⛔ | Unhandled Rejection`)
		
		.setDescription(`\`\`\`${reason.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setTimestamp()
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setFooter({text: 'Imagine a bot without anti-crash'})
		.setColor("RED")

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
    
    
	//client.logger.error(`${reason.stack}`)
	}
})

process.on('uncaughtException', (err, origin) => {
	const channel = client.channels.cache.find(c => c.id === err_chnl)

	const embed = new MessageEmbed()
		.setTitle(`⛔ • Uncaught Exception`)
		.setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
		.setDescription(`\`\`\`${err.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setTimestamp()
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setFooter({text:'Imagine a bot without anti-crash'})
		.setColor('#FF5757')

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
		console.log("no channel")//client.logger.error(`${err.stack}`)
  }
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
	const channel = client.channels.cache.find(c => c.id === err_chnl)

	const embed = new MessageEmbed()
		.setTitle(`⛔ • Uncaught Exception Monitor`)
		.setURL(
			'https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor'
		)
		.addField('Origin', origin.toString(), true)
		.setDescription(`\`\`\`${err.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setTimestamp()
		.setFooter({text: 'Imagine a bot without anti-crash'})
		.setColor('#FF5757')

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
	console.log("no channel")	//client.logger.error(`${err.stack}`)
	}
})

//command handler
const fs = require("fs");

const prefix = "ss"
client.commands = new Discord.Collection();
client.slashCommands = new Collection()
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
client.on ("messageCreate", message => { 
if ( message.content.startsWith ( prefix ) ) { 
  const args = message.content.slice(prefix.length).trim().split(/ +/g) 
  const commandName = args.shift()
  const command =    client.commands.get(commandName) ||
client.aliases.get(commandName)

  if(!command) return
  command.run(client, message, args)
}
})
//server vote
let sent = false;
client.on('messageCreate', async (message) => {
  // Check if the message contains a number
  const numberPattern = /\d+/g;
  if (message.author.id === "1122527870401646622" && message.content.match(numberPattern)) {
    // Extract the number from the message content
    const number = message.content.match(numberPattern).join('');
    // Send the number to the webhook
let channel = await client.channels.cache.get("1122523605788532756")
   const rech = new MessageEmbed ()
    .setDescription(`**<@${number}> got 7000 📀Coins by voting our Server on top.gg!**`)
    .setColor("RANDOM")
    channel.send({embeds:[rech]});
db.add(`coins_${number}`, 7000);
    let user = await client.users.fetch(number)
const reward = new MessageEmbed ()
    .setDescription (`**<@${number}> Thanks for voting our server on top.gg you have got 7000 📀Coins**`)
    .setColor("YELLOW")

  user.send({ embeds:[reward]});
sent = true;


  }
});
//bot vote
let sent2 = false;
client.on('messageCreate', async (message) => {
  // Check if the message contains a number
  const numberPattern = /\d+/g;
  if (message.author.id === "1123786902613536770" && message.content.match(numberPattern)) {
    // Extract the number from the message content
    const number = message.content.match(numberPattern).join('');
    // Send the number to the webhook
let channel = await client.channels.cache.get("1122523605788532756")
   const rech = new MessageEmbed ()
    .setDescription(`**<@${number}> got 7000 📀Coins by voting our Bot on top.gg!**`)
    .setColor("RANDOM")
    channel.send({embeds:[rech]});
db.add(`coins_${number}`, 7000);
    let user = await client.users.fetch(number)
const reward = new MessageEmbed ()
    .setDescription (`**<@${number}> Thanks for voting our Bot on top.gg you have got 7000 📀Coins**`)
    .setColor("YELLOW")

  user.send({ embeds:[reward]});
sent2 = true;
  }
});


//trigger code ↓
client.on('messageCreate', async (message) => {
  if (message.content == "ssrn") {
    const embed = new MessageEmbed ()
    .setDescription("2")
    .setColor("Yellow")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssregister") {
    const embed = new MessageEmbed ()
    .setTitle("REGISTERATION")
    .setDescription("Hello, the Kahoot will be happening this sunday on the 30th at `5pm AEST`. Please be responsible and try not be late.")
    .setFooter("For assistance, pls contact TD or Mateen")
    .setColor("YELLOW")
    const agree = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("CONTINUE")
    .setCustomId("A")
    const disagree = new MessageButton()
    .setStyle("PRIMARY")
    .setLabel("EXIT")
    .setCustomId("B")
    client.on("interactionCreate", async (interaction) => {
      if (interaction.customId === "A") {
        const user = await client.users.fetch('1018816958587748383')
        const register = new MessageEmbed ()
        .setTitle("Registeration Succesful!")
        .setDescription("You have succesfully registered for the kahoot. Make sure to arrive on time, and contact TD or Mateen for any assistence.")
        .setColor("YELLOW")
        message.channel.send({embeds:[register]})
        await user.send(`${message.author.tag} has register for the Kahoot`)
      }
      if (interaction.cunstomId === "B") {
        const failed = new MessageEmbed ()
        .setTitle("REGISTRATION FAILED")
        .setDescription("Thanks for checking this out, we would still love for you to join us!!")
        .setFooter("You're goanna be missing out on a lot of fun!")
        .setColor("YELLOW")
        message.channel.send({embeds:[failed]})
      }
     })
    const hi = new MessageActionRow().addComponents(agree, disagree);
    message.channel.send({embeds:[embed], components:[hi]})
  }
  
  
  if (message.content === "ssbuy shubman gill") {
    const embed = new MessageEmbed ()
  .setTitle("Shubman Gill")
  .setDescription("Not yet available")  .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124232597736792084/image.png?width=377&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbuy virat kohli") {
    const embed = new MessageEmbed ()
    .setTitle("The KING")
.setImage("https://media.discordapp.net/attachments/1124232404375179285/1124232598076522557/Screen_Shot_2023-06-30_at_12.21.24.png?width=575&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbuy stuart broad") {
    const embed = new MessageEmbed ()
    .setTitle("Stuart Broad")
.setImage("https://media.discordapp.net/attachments/1124232404375179285/1124261225937780777/Screen_Shot_2023-06-30_at_14.26.30.png?width=406&height=584")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbuy james anderson") {
    const embed = new MessgeEmbed ()
    .setTitle("James Anderson")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124260464164089926/Screen_Shot_2023-06-30_at_14.23.35.png?width=383&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbuy steve smith") {
    const embed = new MessageEmbed ()
    .setTitle("Steve Smith")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124232598495973467/Screen_Shot_2023-06-30_at_12.00.40.png?width=518&height=585")
    message.channel.send({embeds:[embed]})
  }
  
  if (message.content === "ssbuy faf du plessis") {
    const embed = new MessageEmbed ()
    .setTitle("Faf du Plessis")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124232598936363048/Screen_Shot_2023-06-30_at_11.54.10.png?width=440&height=584")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy shikhar dhawan")) {
    const embed = new MessageEmbed()
    .setTitle("Shikhar Dhawan")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124235361871216640/Screen_Shot_2023-06-30_at_12.43.53.png?width=518&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy sky")) {
    const embed = new MessageEmbed ()
    .setTitle("SKY")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124236338053529600/Screen_Shot_2023-06-30_at_12.47.40.png?width=546&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy rahane")) {
    const embed = new MessageEmbed ()
    .setTitle("Ajinkya Rahane")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124237334523686942/Screen_Shot_2023-06-30_at_12.51.45.png?width=544&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy rishabh pant")) {
    const embed = new MessageEmbed ()
    .setTitle("Rishabh Pant")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124238465199001690/Screen_Shot_2023-06-30_at_12.56.14.png?width=550&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy kane williamson")) {
    const embed = new MessageEmbed ()
    .setTitle("Kane Williamson")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124239918923784233/Screen_Shot_2023-06-30_at_13.02.05.png?width=460&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy joe root")) {
    const embed = new MessageEmbed ()
    .setTitle("Joe Root")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124240607569772634/Screen_Shot_2023-06-30_at_13.04.43.png?width=498&height=585")
    message.channel.send({embeds:[embed]})
  }
  
  if (message.content.includes("ssbuy ishan kishan")) {
    const embed = new MessageEmbed ()
    .setTitle("Ishan Kishan")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124241306240155709/Screen_Shot_2023-06-30_at_13.07.35.png?width=564&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy marnus")) {
    const embed = new MessageEmbed ()
    .setTitle("Marnus Labushagne")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124242252382879744/Screen_Shot_2023-06-30_at_13.11.18.png?width=596&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy jos buttler")) {
    const embed = new MessageEmbed ()
    .setTitle("Jos Buttler")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124244425128816640/Screen_Shot_2023-06-30_at_13.19.54.png?width=541&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy jaspirit bumrah")) {
    const embed = new MessageEmbed ()
    .setTitle("Jaspirit Bumrah")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124245491404775444/Screen_Shot_2023-06-30_at_13.24.09.png?width=490&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy mohd siraj")) {
    const embed = new MessageEmbed ()
    .setTitle("Mohammed Siraj")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124246464407810129/Screen_Shot_2023-06-30_at_13.28.00.png?width=473&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy starc")) {
    const embed = new MessageEmbed ()
    .setTitle("Mitchell Starc")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124247266018992189/Screen_Shot_2023-06-30_at_13.31.08.png?width=413&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy pat cummins")) {
    const embed = new MessageEmbed ()
    .setTitle("Pat Cummins")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124248128770539580/Screen_Shot_2023-06-30_at_13.34.37.png?width=502&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy nathan lyon")) {
    const embed = new MessageEmbed ()
    .setTitle("Nathan Lyon")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124249000040734850/Screen_Shot_2023-06-30_at_13.38.01.png?width=519&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy devon conway")) {
    const embed = new MessageEmbed ()
    .setTitle("Devon Conway")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124254663764619364/Screen_Shot_2023-06-30_at_14.00.31.png?width=475&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy alex carey")) {
    const embed = new MessageEmbed ()
    .setTitle("Alex Carey")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124255600927318047/Screen_Shot_2023-06-30_at_14.04.19.png?width=475&height=585")
    message.channel.send({embeds:[embed]})
  }
  if (message.content.includes("ssbuy ms dhoni")) {
    const embed = new MessageEmbed ()
    .setTitle("MS DHONI")
    .setImage("https://media.discordapp.net/attachments/1124232404375179285/1124514304159399947/image.png?width=368&height=585")
    message.channel.send({embeds:[embed]})
  }
                                              
  ///Info -- START-- 
  if (message.content === "ssinfo") {
    message.channel.send("Gurki developded this Server. The server was originally created for his cricket team, but it has since grown to be incredibly popular, and we are actively seeking new members. Please feel free to DM 𝑺𝑼𝑷𝑹𝑽𝑰𝑹𝑨𝑻🕉#1855 or .GameDoggo ☬#8156 if you require any help.\n")
  } ///Info -- END --

  
  //Updates Command -- START
  if (message.content === "ssupdates") {
    const embed = new MessageEmbed ()
  .setTitle("---UPDATES---")
  .setDescription("**- qotd\n- chatGPT\n- cricket\n- news\n- memes\n- ipl cards review\n- sssocial\n- invite\n- invites**")
  .setColor("BLUE")
  .setFooter({ text:`Requested By ${message.author.username}`, iconURL:
message.author.displayAvatarURL() })
    message.channel.send({embeds:[embed]})
  }//Updates Command -- END --

  ///Spoiler Command -- START -- 
  if (message.content === "ssreveal") {
    const embed = new MessageEmbed ()
  .setTitle("---UPCOMING UPDATES---")
  .setDescription("- New objects to shop\n- Voting remidners and rewards")
  .setColor("BLUE")
  .setFooter(`${message.author.usernmae} wanted to know the SPOILERS`)
    message.channel.send({embeds:[embed]})///Spoiler --END--
  }
///Potm Cards -- START --
  if (message.content === "sspotm cards") {
    const embed = new MessageEmbed ()
  .setTitle("-- **POTM CARDS** --")
  .setDescription("- Harry Tector\n- Kane Williamson\n- David Miller\n- Shubman Gill\n- P Litchfield\n- A Gardner\n- Gaby Lewis\n- Smriti Mandhana\n- Emma Lamb\m- Ravindra Jadeja\n- Jos Buttler")
  .setColor("RED")
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) //Author PFP -- START & END --
  .setFooter({ text:`Requested By ${message.author.username}`, iconURL:
message.author.displayAvatarURL() })
  .setThumbnail(
     message.author.displayAvatarURL({ dynamic: true })
    )
    message.channel.send({embeds: [embed]})
  } ///Potm Cards -- END--
    
  if (message.content === "ssbest") {/// ssbest -- START --
    const embed = new MessageEmbed ()
  .setTitle("Help - **SSBEST**")
  .setDescription("If you would like to know the best players from each range, do the following:\n**ssbest** <Range> <bat/bowl/alr/wk>")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }/// ssbest -- END --
  
  //IPL Card Review -- START --
  if (message.content === "ssipl cards review") {
    const embed = new MessageEmbed() //IPL Image -- START --
  .setTitle("Detailed Review of all IPL Cards")
  .setColor("DARK_RED")
.setImage('https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Indian_Premier_League_Official_Logo.svg/1200px-Indian_Premier_League_Official_Logo.svg.png') //IPL Image -- End --
  .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) //Author PFP -- START & END --
  //Reviews -- START --
  .setDescription(`**Faf** = Faf has been batting extremely good in numerous people's game. He contains the potential to get high scores with a good strike rate and has been seen as a clutch player sometimes\n**Jaiwal** = Jaiswal is now the second best 89 bat. He can hit higher overall rated bowlers up till 93.\n**Gill** = Gill is the best 94 opener and his very consistent with his scores and strike rate\n**SKY** = Sky is a flexible player unlike his other cards and can bat at 3, 4, 5, and 6. He bats best at 3.\n**Heinrich Klassen** = Genrally he is inconsistent however he can clutch sometimes\n**Rinku Singh** = Rinku Singh is a bit inconsistent but is amazing when it comes to clutch.\n**Axar Patel** = Axar Patel is not very economical and often leaks, however he can get some wickets. With the bat, he is good for finishing and bats at 6.\n**Rashid Khan** = Rashid Khan is a goated bowler, who does the job of an allrounder. He picks up crucial wickets tht turn out be game changing and with his 69 bat he can finish the match with a strike rate of about 250.\n**Mohd Shami** = Mohd Shami is the best 94 bowler who bowls economically in the start and death\n**Mohit Sharma** = Mohit Sharma is a balanced bowler, who sometimes leaks but get early breakthroughs.\n**Mohd Siraj** = Mohd Siraj is a cracked bowler. He can bowl anywhere and gets wickets as well as being economical. He is the best 90 pace bowler.\n**Devon Conway** = Unlike devon conway's other card, he does not have the ability to hit big scores, but he can still play 30 to 40 runs cameos.\n**Virat Kohli** = Virat Kohli is very inconsistent and struggles when it comes to strike rate. He chokes many times while opening and 1 down in both short over games and long over games, however he can bat good rarely\n**Cameron Green** = Cameroon Green is a really good allrounder. With the bat, he can smack higher rated bowlers and play good innings. With the bowl, he can get 1 to 2 wickets and bowls in the absolute death.\n**Piyush Chawla** = Although he doesn't leak much, he barely gets any wickets, but he is very economical.\n**Matheesha Pathirana** = Pathirana can get some wickets of players between the ratings up to 88, but can get absolutely destroyed while bowling to higher rated batsmans.\n**Tilak Varma** = Tilak is a good option for low budget, he can play good innings with a good strike rate.\n\nFor more queries, contact T.D in ${channel}`) //Reviews -- END --
  .setFooter({ text:`Requested By ${message.author.username}`, iconURL:
message.author.displayAvatarURL() })
  .setThumbnail(
     message.author.displayAvatarURL({ dynamic: true })

    )
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssinvite") {//Invite -- START --
    const embed = new MessageEmbed ()
    .setTitle("TIPS:")
    .setDescription("- Daddy role for a week if 5 invites!!!\n- Daddy role for 2 weeks if you get 10 invites!!!\n- Daddy role for 3 weeks if you get 15 invites!!!\n- Daddy role for a month is you get 20 invites!!!\n- Daddy role for infinite time if you get 20-50 invites!!!\n- Admin if you get more than 50 invites!!!\n\n- **INVITE LINK** - https://discord.gg/THJhePHaH7")
    .setColor("YELLOW")
    .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
  message.channel.send({embeds:[embed]})//Invite -- END --      
  }
  if (message.content === "ssbest 69 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **69 ALR** --")
  .setDescription("- Jarvo")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  
  if (message.content === "ssbest 80 bat") {
    const embed = new MessageEmbed ()
    .setTitle("-- 80 BAT --")
    .setDescription("- Beau Webster\n- Jordan Silk\nBrandon King")
    .setColor("RED")
    message.channel.send({embeds: [embed]})
  }
  if (message.content === "ssbest 80 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- 80 BOWL --")
  .setDescription("- Will Somerville")
  .setColor("RED")
    message.channel.send({embeds: [embed]})
  }
  if (message.content === "ssbest 80 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- 80 ALR --")
  .setDescription("- Tood Astle")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
    
  if (message.content === "ssbest 80 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- 80 WK --")
  .setDescription("- Ben Dunk")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 81 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **81 BAT** --")
  .setDescription("- Y Jaiswal *BASE*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  
  if (message.content === "ssbest 81 bowl") {
    const embed =  new MessageEmbed ()
  .setTitle("-- **81 BOWL** --")
  .setDescription("- Akeal Hossain")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }  

  if (message.content == "ssbest 81 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **81 ALR** --")
  .setDescription("- None")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 81 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **81 WK** --")
  .setDescription("- KS Bharat")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  
  if (message.content === "ssbest 82 bat") {
    const embed = new MessageEmbed()
  .setTitle("-- **82 BAT** --")
  .setDescription("- Zak Crawley\n- Rahul Tripathi\n- Devdutt Padikkal\n- Rovman Powell")
  .setColor("RED")  
    message.channel.send({embeds:[embed]})  
  }
  
  if (message.content === "ssbest 82 bowl"){
    const embed = new MessageEmbed()
  .setTitle("-- **82 BOWL** --")
  .setDescription("- Usman Qadir\n- Steven Finn\n- Fazalhaq Farooqi *ASIA CUP*")
  .setColor("RED")
message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 82 alr"){
    const embed = new MessageEmbed()
.setTitle("-- **82 ALR**")
  .setDescription("- Chris Green\n- Mohd Nawaz")
.setColor("RED")
message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 82 wk"){
    const embed = new MessageEmbed()
.setTitle("-- **82 WK** --")
.setDescription("- Rahmanullah Gurbaz\n- Phil Salt\n- Tom Blundell\n- Ollie Pope\n- Ben Mcerdmott")
.setColor("RED")
message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 83 bat"){
    const embed = new MessageEmbed()
  .setTitle("-- **83 BAT** --")
  .setDescription("- Ruturaj Gaikwad\n- Colin Ingram\n- Abid Ali")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 83 bowl"){
    const embed = new MessageEmbed()
  .setTitle("-- **83 BOWL** --")
  .setDescription("- Naseem Shah *BASE and ASIA CUP*\n- Paul Van Meekeren *T20 WC*\n- Pradish Krishna")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 83 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **83 ALR** --")
  .setDescription("- Krunal Pandya\n- Dwaine Pretorious\n- Fabian Allen\n- Sikandar Raza *BASE*")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 83 wk"){
    const embed = new MessageEmbed ()
  .setColor("RED")
  .setTitle("-- **83 WK** --")
  .setDescription("- Richa Gosh *BASE*\n- Kusal Perera\n- W Saha\n- B Rajapaksa *BASE*")
  message.channel.send({embeds:[embed]})
  }
  
  if (message.content == "ssbest 84 bat"){
    const embed = new MessageEmbed ()
  .setColor("RED")
  .setTitle("-- **84 BAT** --")
  .setDescription("- Lahiru Thrimmane\n- Max o'dowd *T20 WC*\n- Shan Masood")
  message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 84 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **84 BOWL** --")
  .setDescription("- Jhye Richardson\n- Deepak Chahar\n- Karishma Ramharack *T20 WC8\n- Sandeep Lamichane\n- Jack Leach")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }
  if (message.content == "ssbest 84 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **84 ALR** --")
  .setDescription("- Cameron Green *BASE*\n- David Wiese\n- James Faulkner\n- Faheem Ashraf\n- Roston Chase\n- Ashton Agar\n- David Willey")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 84 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **84 WK** --")
  .setDescription("- Rahmanullah Gurbaz *ASIA CUP*\n- Ishan Kishan\n- B Rajapaksa *ASIA CUP*\n- Alex Carey")
  .setColor("RED")
  message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 85 bat"){
    const embed = new MessageEmbed()
  .setTitle("-- **85 BAT** --")
  .setDescription("- Dimuth Karunatnre\n- Tim David *BBL*\n- Imam-ul-haq\n- Darren Bravo\n- P Litchfield *POTM*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 85 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **85 BOWL** --")
  .setDescription("- Taskin Ahmed *T20 WC*\n- Kuldeep Yadav\n- Matt Henry\n- Charlie Dean *POTM*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 85 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **85 ALR** --")
  .setDescription("- Dasun Shanka\n- Mehidy Hasan")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 85 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **85 WK** --")
  .setDescription("- Glen Phillips\n- Sanju Samson")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
      
  if (message.content === "ssbest 86 bat"){
    const embed = new MessageEmbed ()
  .setTitle("-- **86 BAT** --")
  .setDescription("- Shubman Gill\n- Travis Head")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 86 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **86 BOWL** --")
  .setDescription("- Mustafizur Rahman\n- Ish Sodhi")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 86 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **86 ALR** --")
  .setDescription("Axar Patel *Rario and BASE*\nMitchell Santner\nAaron Hardie *BBL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 86 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **86 WK** --")
  .setDescription("- Josh Inglis *BBL*\n- Richa Gosh *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 87 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **87 BOWL** --")
  .setDescription("- Arsheep Singh *T20 WC*\n- Kyle Jamieson\n- Haris Rauf *BASE*\n- Imran Tahir")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 87 bat"){
    const embed = new MessageEmbed ()
  .setTitle("-- **87 BAT** --")
  .setDescription("- Chris Lynn *BBL*\n- Usman Khawaja *BASE*\n- Glenn Phillips *T20 WC*\n- Shreyas Iyer\n- Kevin o'brien\n- Tilak Varma *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === 'ssbest 87 alr'){
    const embed = new MessageEmbed ()
  .setTitle("-- **87 ALR** --")
  .setDescription("- Matt Short *BBL*\n- Liam Livingston\n- Wanindu Hasaranga *BASE*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 87 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **87 WK** --")
  .setDescription("- None")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content == "ssbest 88 bat"){
    const embed = new MessageEmbed ()
  .setTitle("-- **88 BAT** --")
  .setDescription("- Alex Hales *T20 WC*\n- Meg Lanning *BASE*\n- Michael Bevan\n- Rinku Singh *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 88 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **88 BOWL** --")
  .setDescription("- Darcie Brown *T20 WC*\n- Issy Wong *WPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 88 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **88 ALR** --")
  .setDescription("- Abdul Razzaq\n- Wanindu Hasaranga *ASIA CUP*\nSikandar Raza *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 88 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **88 WK** --")
  .setDescription("- Devon Conway\n- Tazmin Britts")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 89 bat"){
    const embed = new MessageEmbed ()
  .setTitle("-- **89 BAT** --")
  .setDescription("- Shubman Gill *POTM*\n- Rilee Rossouw *PSL*\n- Suresh Raina\n- David Miller *POTM*\n- Y Jaiswal *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 89 bowl"){
    const embed = new MessageEmbed ()
  .setTitle("-- **89 BOWL** --")
  .setDescription("- Mark Wood\n- Saeed Ajmal")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 89 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **89 ALR** --")
  .setDescription("- Irfan Pathan\n- JP Duminy\n- Cameron Green *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 89 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **89 WK** --")
  .setDescription("- Andy Flower\n- Alyssa Healy *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 90 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **90 BAT** --")
  .setDescription("- Andrew Strauss\n- Eion Morgan\n- SKY *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 90 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **90 BOWL** --")
  .setDescription("- Sophie Ecclestone *T20 WC*\n- Umar Gul\nHaris Rauf *PSL*\nMohd Siraj *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 90 alr"){
    const embed = new MessageEmbed ()
  .setTitle("-- **90 ALR** --")
  .setDescription("- Marco Jansen *TOTY*\n- Andre Russe\n- Moeen Ali\n- Shadab Khan *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 90 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **90 WK** --")
  .setDescription("None")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 91 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **91 BAT** --")
  .setDescription("- Harampreet Kaur *WPL*\n- Daryl Mitchell *TOTY*\n- Gautam Gambhir")
  .setColor("RED")
    message.channel.send({embeds:[embed]})  
  }
  if (message.content === "ssbest 91 bowl") {
    const embed = new MesageEmbed ()
  .setTitle("-- **91 BOWL** --")
  .setDescription("- Jofra Archer\n- Sam Curran *T20 WC*\n- Shaheen Afridi")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 91 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **91 ALR** --")
  .setDescription("- A Gardner *T20 WC*\n- Imad Wasim *PSL*\n- Hardik Pandya")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 91 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **91 WK** --")
  .setDescription("- KL Rahul\n- Mohd Rizwan\n- Q-De-Kock")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 92 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **92 BAT** --")
  .setDescription("- Faf du Plessis *BASE and RARIO*\n- TM Dilshan\n- Smriti Mandhana *POTM*\n- SKY *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 92 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **92 BOWL** --")
  .setDescription("- Josh Hazlewood\n- Tim Southee\n- Shaheen Afridi *T20 WC*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 92 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **92 ALR** --")
  .setDescription("- A Gardner *POTM*\n- Andrew Flintoff")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 92 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **92 WK** --")
  .setDescription("- Rishabh Pant *TOTY*\n- Mohd Rizwan *ASIA CUP*")
  .setColor("RED")
   message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 93 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **93 BAT** --")
  .setDescription("- Kevin Pietersen\n- Steve Smith *BBL*\n- Babar Azam *PSL*")
   message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 93 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **93 BOWL** --")
  .setDescription("- Shane Bond\n- M Ntini")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 93 alr") {
    const embed =  new MessageEmbed ()
  .setTitle("-- **93 ALR** --")
  .setDescription("- Yuvraj Singh\n- Daniel Vettori")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 93 wk") {
    const embed = new MessageEmed ()
  .setTitle("-- **93 WK** --")
  .setDescription("- B Mcullum")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 94 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **94 BAT** --")
  .setDescription("- M Jayawardene\n- A Cook\n- Shubman Gill *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 94 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **94 BOWL** --")
  .setDescription("- Trent Boult\n- James Anderson\n- Morne Morkel\n- Mohd Shami *IPL*\n- Saqlain Mushtaq")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 94 alr") {
    const embed =  new MessageEmbed ()
  .setTitle("-- **94 BOWL** --")
  .setDescription("- Hayley Matthews *WPL*\n- Ben Stokes\n- Nat Scvier *WPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 94 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **94 WK** --")
  .setDescription("- Jos Buttler *T20 WC*\n- J Bairstow *TOTY*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 95 bat"){
    const embed = new MessageEmbed ()
  .setTitle("-- **95 BAT** --")
  .setDescription("- Martin Crowe\n- Michael Hussey\n- Faf-du Plessis *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 95 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **95 BOWL** --")
  .setDescription("- Allan Donald\n- J Bumrah\n- M Johnson\n- Rashid Khan *BASE, RARIO, PSL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 95 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **95 ALR** --")
  .setDescription("- Kapil Dev\n- Imran Khan\n- Ian Botham\n- Shane Watson")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 95 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **95 WK** --")
  .setDescription("- Rahul Dravid")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 96 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **96 BAT** --")
  .setDescription("- Virat Kohli *ASIA CUP*\n- Allan Border\n- Kane Williamson *POTM*")
  .setColor("RED")
   message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 96 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **96 BOWL** --")
  .setDescription("- Anil Kumble\n- Lasith Malinga\n- Rashid Khan *IPL*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 96 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **96 ALR** --")
  .setDescription("- Ben Stokes *TOTY*\n- Richard Hadlee")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 96 wk"){
    const embed = new MessageEmbed ()
  .setTitle("-- **96 WK** --")
  .setDescription("- K Sangakarra\n- MS Dhoni")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 97 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **97 BAT** --")
  .setDescription("- Virat Kohli *T20 WC*\n- Viv Richards\n- Sunil Gavaskar\n- Babar Azam *TOTY*")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 97 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **97 BOWL** --")
  .setDescription("- Michael Holding\n- Glenn Mgrath\n- Dale Styen")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 97 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **97 ALR** --")
  .setDescription("- G Sobers")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 97 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **97 WK** --")
  .setDescription("- No such Players")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 98 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **98 BAT** --")
  .setDescription("- No such Players")
  .setColor("RED")
   message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 98 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- **98 BOWL** --")
  .setDescription("- Wasim Akram")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }  
  if (message.content === "ssbest 98 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- **98 ALR** --")
  .setDescription("- J Kallis")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 98 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- **98 WK** --")
  .setDescription("- Ab-de-Villiers")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "ssbest 99 bat") {
    const embed = new MessageEmbed ()
  .setTitle("-- **99  BAT** --")
  .setDescription("- Sachin Tendulkar\n- Don Bradman")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 99 bowl") {
    const embed = new MessageEmbed ()
  .setTitle("-- 99 BOWL --")
  .setDescritipion("- No such Players")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 99 alr") {
    const embed = new MessageEmbed ()
  .setTitle("-- 99 ALR --")
  .setDescription("- No such Players")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }
  if (message.content === "ssbest 99 wk") {
    const embed = new MessageEmbed ()
  .setTitle("-- 99 WK --")
  .setDescription("- No such Players")
  .setColor("RED")
    message.channel.send({embeds:[embed]})
  }

  if (message.content === "cccg help"){
    message.channel.send("If you would like to know the bet player from each range, do the following\nssbest (**range**) (**bat/bowl/alr/wk**)")
  }
})
//status
 
client.on('ready', () => {
client.user.setActivity(`${prefix}help | ${client.guilds.cache.size} servers`, { type: 'PLAYING' })
          })
//login and error handler
client.login() //Bot Token
console.log("Working ✓")
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
