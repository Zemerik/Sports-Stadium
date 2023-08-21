const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'qotd',
  description: 'Get a quote of the day!',
  run:async(client,message, args) =>{
    try {
      // Fetch the quote of the day from the API
      const response = await axios.get('https://favqs.com/api/qotd');
      const { body, author } = response.data.quote;

      // Create the embed
      const embed = new MessageEmbed()
        .setColor('RANDOM') // Yellow color
        .setAuthor("Quote of the Day", message.guild.iconURL())
       // .setTitle('')
        .setDescription(`**"${body}"**\n\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _- ${author}`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());

      // Send the embed
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching quote of the day:', error);
      message.reply('Oops! Something went wrong while fetching the quote of the day. Please try again later.');
    }
  },
};
