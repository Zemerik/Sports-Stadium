
const Discord = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Deletes a specified number of messages.',
  aliases:["clear"],
  run:async(client,message, args)=> {
    
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**Please specify the number of messages to delete!**')
        .setColor('#ffff00');
      
      return message.channel.send({ embeds: [embed] });
    }
    
    const amount = parseInt(args[0]);
    
    if (isNaN(amount)) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**Please enter a valid number of messages to delete!**')
        .setColor('#ffff00');
      
      return message.channel.send({ embeds: [embed] });
    }
    
    if (amount < 1 || amount > 1000) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**Please enter a number between 1 and 1000!**')
        .setColor('#ffff00');
      
      return message.channel.send({ embeds: [embed] });
    }
    
    
let deleted = 0;
while (deleted < amount) {
  const toDelete = Math.min(amount - deleted, 100);
  await message.channel.bulkDelete(toDelete + 1);
  deleted += toDelete;
  }
    
   

  },
}; 

