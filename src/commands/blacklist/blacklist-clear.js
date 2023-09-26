const Discord = require("discord.js")
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../../blacklist.js");

module.exports={
  name:"blacklist-clear",
  description:"remove all blacklisted words from your server",
  aliases:["bl-clear"],
  category:"moderation",
  run:async(client, message,args)=>{
  if (message.author.bot) return; // Ignore messages from bots
  if (!message.guild) return; // Ignore DMs
 
 if (!message.member.permissions.has('MANAGE_CHANNELS')) {
  
    const perms = new Discord.MessageEmbed()
      .setTitle('Permission Denied')
      .setDescription('You do not have permission to manage the blacklist system.')
      .setColor("RED")
message.reply({ embeds: [perms] });
  return;
    }

  clearBlacklistedWords(message.guild);
    
    const embed = new Discord.MessageEmbed()
      .setTitle('Blacklist Cleared')
      .setDescription('The list of blacklisted words has been cleared for this server.')
     .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

      
    message.channel.send({ embeds: [embed] });

  }
}