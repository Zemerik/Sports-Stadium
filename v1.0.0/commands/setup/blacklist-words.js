const Discord = require("discord.js")
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../../blacklist.js");

module.exports={
  name:"blacklist-words",
  description:"shows blacklisted words for your server",
  aliases:["bl-words"],
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

   const blacklistedWords = getBlacklistedWords(message.guild)
    
    if (blacklistedWords.length === 0) {
      const embed = new Discord.MessageEmbed()
        .setTitle('No Words Blacklisted')
        .setDescription('There are no words currently blacklisted for this server.')
         .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

      message.channel.send({ embeds: [embed] });
      return;
    }
    
    const embed = new Discord.MessageEmbed()
      .setTitle('Current Blacklist')
      .setDescription(`The following words are currently blacklisted for this server: ${blacklistedWords.join(' | ')}`)
   .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   
    
    message.channel.send({ embeds: [embed] });
  }
}