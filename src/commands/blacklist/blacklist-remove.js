const Discord = require("discord.js")
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../../blacklist.js");

module.exports={
  name:"blacklist-remove",
  description:"remove blacklist words for your server",
  aliases:["bl-remove"],
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

    const word = args[0];
    if (!word) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Invalid Command')
        .setDescription('Please provide a word to remove from the blacklist.')
 .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

      
      message.channel.send({ embeds: [embed] });
      return;
    }
    
    removeBlacklistedWord(message.guild, word);
    
    const embed = new Discord.MessageEmbed()
      .setTitle('Word Removed from Blacklist')
      .setDescription(`'${word}' has been removed from the blacklist.`)
 .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

    
    message.channel.send({ embeds: [embed] });
  
  }
}