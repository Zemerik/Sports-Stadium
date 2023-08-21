const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'removegpt',
  description: 'Remove your GPT API key',
  run:async(client,message, args) =>{
message.react("👍")

      const user = message.author;

      // Check if API key is set for the user
      const apiKey = db.get(`apiKeys.${user.id}`);
      if (!apiKey) {
        const embed = new Discord.MessageEmbed()
          .setColor('RED') // Set the embed color to yellow
          .setDescription('No GPT API key found.\nUse **[prefix]setgpt** command to set one.');

        return message.channel.send({embeds:[embed]});
      }

      // Remove the API key from the database
      db.delete(`apiKeys.${user.id}`);

      const embed = new Discord.MessageEmbed()
        .setColor('GREEN') // Set the embed color to yellow
        .setDescription('GPT API key removed successfully!');

      return message.channel.send({embeds:[embed]});
    
      
    
  },
};
