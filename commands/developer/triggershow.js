const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const {reply}= require ("../../config.json")
module.exports = {
  name: 'trigger-show',
  description: 'Show all triggers and their responses',
  aliases:["tshow"],
  run: async (client, message, args) => {
    if (message.author.bot || !message.guild) return;
    const triggers = db.get(`triggers`);

    if (!triggers || Object.keys(triggers).length === 0) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('**There are no triggers set for this server!**');
      return message.channel.send({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setAuthor('Trigger Commands',client.user.displayAvatarURL())    
                 .setColor('YELLOW')
.setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
 
    for (const [trigger, response] of Object.entries(triggers)) {
      embed.addField(trigger,` ${reply}${response}`);
    }

    message.channel.send({ embeds: [embed] });
  },
};
