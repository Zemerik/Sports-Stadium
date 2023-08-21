const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'trigger-add',
  description: 'Add a trigger and response',
aliases:["tadd"],

  run:async(client,message, args) =>{
    const config = require("../../config.json")
    const allowedUserIds = config.allowedUserIds; 
if (!allowedUserIds.includes(message.author.id)) {
  const embed = new MessageEmbed() .setColor('#ff0000') 
.setDescription('**You are not authorized to use this command!**'); return message.channel.send({ embeds: [embed] }); 
}
    
    if (message.author.bot || !message.guild) return;
const no = new MessageEmbed()
      .setColor('#ffff00')
.setTitle('Please provide a trigger and response!');
    if (args.length < 2) {
      return message.reply({embeds:[no]})
    }

    const trigger = args[0];
    const response = args.slice(1).join(' ');

    db.set(`triggers.${trigger}`, response);

    const embed = new MessageEmbed()
      
      .setAuthor('Trigger Added',client.user.displayAvatarURL())    
      
      .addField('Trigger', trigger)
      .addField('Response', response)
.setColor('YELLOW')
.setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
 



    message.channel.send({embeds:[embed]});
  },
};
