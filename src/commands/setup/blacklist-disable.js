const Discord = require("discord.js")
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../../blacklist.js");

module.exports={
  name:"blacklist-disable",
  description:"disable blacklist system for your server",
  aliases:["bl-disable"],
  category:"moderation",
  run:async(client, message,args)=>{
  if (message.author.bot) return; // Ignore messages from bots
  if (!message.guild) return; // Ignore DMs
 
 if (!message.member.permissions.has('MANAGE_CHANNELS')) {
  
    const perms = new Discord.MessageEmbed()
      .setTitle('Permission Denied')
      .setDescription('You do not have permission to enable or disable the blacklist system.')
      .setColor("RED")
message.reply({ embeds: [perms] });
  return;
    }

  setBlacklistEnabled(message.guild, false);
    
    const embed = new Discord.MessageEmbed()
      .setTitle('Blacklist Word System Disabled')
      .setDescription('The blacklist word system has been disabled for this server.')
     .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

      
    message.channel.send({ embeds: [embed] });

  }
}