const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'trigger-remove',
  description: 'Remove a trigger and its response',
  aliases:["tremove"],
  run: async (client, message, args) => {
     const config = require("../../config.json")
    const allowedUserIds = config.allowedUserIds; 
if (!allowedUserIds.includes(message.author.id)) {
  const embed = new MessageEmbed() .setColor('#ff0000') 
.setDescription('**You are not authorized to use this command!**'); return message.channel.send({ embeds: [embed] }); 
}
    if (message.author.bot || !message.guild) return;
    if (args.length < 1) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('**Please provide a trigger to remove!**');
      return message.channel.send({ embeds: [embed] });
    }

    const trigger = args[0];

    if (!db.has(`triggers.${trigger}`)) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('**The specified trigger does not exist!**');
      return message.channel.send({ embeds: [embed] });
    }

    const response = db.get(`triggers.${trigger}`);
    db.delete(`triggers.${trigger}`);

    const embed = new MessageEmbed()
      .setAuthor('Trigger Removed',client.user.displayAvatarURL())    
      
      .addField('Trigger', trigger)
      .addField('Response', response)
.setColor('YELLOW')
.setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
 

    message.channel.send({ embeds: [embed] });
  },
};