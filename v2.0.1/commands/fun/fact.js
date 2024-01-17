const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'fact',
  description: 'Get a random fact!',
  run:async(client,message, args) =>{
    try {
      // Fetch the fun fact from the API
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json');
      const { text: randomFact } = response.data;

      // Create the embed
      const embed = new MessageEmbed()
        .setColor('RANDOM') // Yellow color
        .setAuthor('Random Fact',message.guild.iconURL())
        .setDescription(`**${randomFact}**`)
    .setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL())  

      // Send the embed
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      message.reply('Oops! Something went wrong while fetching the fun fact. Please try again later.');
    }
  },
};
