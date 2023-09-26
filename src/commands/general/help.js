
const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const {reply}=require("../../config.json")
const dia = " 🔸 "
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')

const prefix = "[ss]"


let home  =`🏡`
  let general = `☕`
let eco = `💰` 
  let fun = `🎊` 
   // let image = `<:eg_art:1044619591869009920>` 
    let set = `⚓` 
    let mod = `🛡️`


module.exports = {
  name:"help",
  //aliases:[""],
  description:"Get information of available bot commands",

run: async (client, message, args) => {



  const inv = new MessageEmbed()
  .setTitle("Command not found")
   .setColor("RED")
  if(args[0]) {
            const ctg = client.commands.get(args[0])
            if(!ctg) return message.reply({embeds:[inv]})
            
          const name = ctg.name
    const alias = ctg.aliases
    ? ctg.aliases:("no aliases for this command")
          const desc = ctg.description ? ctg.description:("no description for this command")
            
        /*    const ctgEmbed = new MessageEmbed()
             .setTitle(`Name: ${name} \nAliases: ${alias} \nDescription: ${desc}`)
             .setTimestamp();*/
   
  const embed = new MessageEmbed()
      //    .setAuthor('Command Details',message.author.displayAvatarURL())
          .addFields({name:
            `${dia} Command Name:`,value: `${reply} ${name}`},          
         {name:`${dia} Aliases:`, value:`${reply} ${alias}`},
                 {name:`${dia} Description:`,value: `${reply} ${desc}`})
              
//.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setFooter({
            text: `Requested by ${message.author.username}`,
            iconURL: message.author.displayAvatarURL({
              dynamic: true
            })
          })      
     
.setThumbnail(
            message.guild.iconURL({ dynamic: true })
          )
  .setColor("RANDOM")
          
message.channle.send({embeds:[embed]})
        } else {
  try {

    const row = new MessageActionRow()

  .addComponents(

    new MessageSelectMenu()

    .setCustomId("select")

    .setPlaceholder("Select your option")

    .addOptions([
  {
    label:`Home Page`,
    description:`Main Menu`,
emoji:`${home}`,

    value:"home"
  },
      {

        label: "General",

        description: "General Commands!",
emoji:`${general}`,
        value: "first"

      },

      {

        label: "Economy",

        description: "Economy Commands!",
emoji:`${eco}`,
        value: "second"

      },

      {

        label: "Fun",

        description: "Fun Commands!",
emoji:`${fun}`,
        value: "third"

      },

   
  {

        label: "SetUp",

        description: "SetUp Commands!",
emoji:`${set}`,
        value: "fifth"

      },
{

        label: "Moderation",

        description: "Moderation Commands!",
emoji:`${mod}`,
        value: "sixth"

      }


    ])

  )


  let embed = new MessageEmbed()

 // .setTitle(' Help Menu')
          .setDescription(
            `My Prefix For __**${
            message.guild.name
            }**__ is **${prefix}**\n`)
          
.addFields({name:`${home}`+` Home Page`,value:`${reply} Home page!`},
          {name:`${general}`+" General",value:`${reply} General Commands!`},          
           
   {name:`${eco}`+" Economy",value:`${reply} Economy Commands!`},
           
        {name:`${fun}`+" Fun",value:`${reply} Fun Commands!`},
       
{name:`${set}`+" SetUp",value:`${reply} SetUp Commands!`},

{name:`${mod}`+" Moderation",value:`${reply} Moderation Commands!`})

   .setFooter({
            text: `Requested by ${message.member.displayName}`,
           iconURL: message.author.displayAvatarURL({
              dynamic: true
            })
          })
          .setTimestamp()
         .setThumbnail(
            client.user.displayAvatarURL({
              dynamic: true
            })
          )
  .setColor("WHITE")


  let sendmsg = message.reply({ephemeral: true, embeds: [embed], components: [row]})


  let embed1 = new MessageEmbed()
//logic
    const genPath = 'commands/general';
    const ecoPath = 'commands/economy'
  const funPath = 'commands/fun' 
 const setPath = 'commands/setup'
    const modPath = 'commands/moderation'

const genfiles = fs.readdirSync(genPath);
const ecofiles = fs.readdirSync(ecoPath);
const funfiles = fs.readdirSync(funPath);
const setfiles = fs.readdirSync(setPath);
const modfiles = fs.readdirSync(modPath);


for (const file of genfiles) {
  const genfilename = path.basename(file);

  if (!genfilename.endsWith('.js')) {
    continue;
  }

  const cmd = client.commands.get(genfilename.replace('.js', ''));
    const description = cmd.description;
    embed1.addField((dia)+genfilename.replace('.js', ''),`${reply} `+description || `${reply} No description available`)

  .setAuthor("General Commands",message.author.displayAvatarURL())

  }
  
  let embed2 = new MessageEmbed()
  

for (const file of ecofiles) {
  const genfilename = path.basename(file);

  if (!genfilename.endsWith('.js')) {
    continue;
  }

  const cmd = client.commands.get(genfilename.replace('.js', ''));
 //if (cmd) {
    const description = cmd.description || `No description available`;
    embed2.addField((dia)+genfilename.replace('.js', ''),`${reply} `+description || `${reply} No description available`)

  .setAuthor("Economy Commands",message.author.displayAvatarURL())

} 

  let embed3 = new MessageEmbed()

for (const file of funfiles) {
  const genfilename = path.basename(file);

  if (!genfilename.endsWith('.js')) {
    continue;
  }

  const cmd = client.commands.get(genfilename.replace('.js', ''));
 //if (cmd) {
    const description = cmd.description;
    embed3.addField((dia)+genfilename.replace('.js', ''),`${reply} `+description || `${reply} No description available`)

  .setAuthor("Fun Commands",message.author.displayAvatarURL())

} 
  
  
  let embed5 = new MessageEmbed()


for (const file of setfiles) {
  const genfilename = path.basename(file);

  if (!genfilename.endsWith('.js')) {
    continue;
  }

  const cmd = client.commands.get(genfilename.replace('.js', ''));
 //if (cmd) {
    const description = cmd.description;
    embed5.addField((dia)+genfilename.replace('.js', ''),`${reply} `+description || `${reply} No description available`)

  .setAuthor("SetUp Commands",message.author.displayAvatarURL())

} 
 
let embed6 = new MessageEmbed()

  
for (const file of modfiles) {
  const genfilename = path.basename(file);

  if (!genfilename.endsWith('.js')) {
    continue;
  }

  const cmd = client.commands.get(genfilename.replace('.js', ''));
 //if (cmd) {
    const description = cmd.description;
    embed6.addField((dia)+genfilename.replace('.js', ''),`${reply} `+description || `${reply} No description available`)

  .setAuthor("Moderation Commands",message.author.displayAvatarURL())

} 
    embed1.setColor("RANDOM")
    embed2.setColor("RANDOM")
    embed3.setColor("RANDOM")
    embed5.setColor("RANDOM")
    embed6.setColor("RANDOM")
    
    
    
    
      // Dropdown Menu Functions
      let menuFilter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;
      let menuCollector = message.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU",
        menuFilter,
        max: "600000",
        time: 600000
      });

      menuCollector.on("collect", async (menu) => {
        let value = menu.values[0];

        if (menu.user.id !== message.author.id) return menu.followUp({ content: `This is not for you ${menu.user}!`, ephemeral: true });

if (value === "home") {


await menu.update({ embeds: [embed], ephemeral: true});
    }

    if (value === "first") {


await menu.update({ embeds: [embed1], ephemeral: true});
    }


    if (value === "second") {

    
await menu.update({ embeds: [embed2], ephemeral: true });
    
    }


    if (value === "third") {

    
await menu.update({ embeds: [embed3], ephemeral: true});
   
    }


 
if (value === "fifth") {

    
await menu.update({ embeds: [embed5], ephemeral: true});
   
    }
  
if (value === "sixth") {

    
await menu.update({ embeds: [embed6], ephemeral: true});
   
    }
                       
  })
      
                  
  } catch (error) {

    console.log(error)

    message.channel.send("An error occured")

  }

        


}
}
  }