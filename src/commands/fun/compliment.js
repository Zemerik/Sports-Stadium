const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'compliment',
  aliases:["comp","praise"],
  description: 'Compliment a user!',
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if (!user) {
      const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription('You must mention a user to compliment!');

      return message.reply({ embeds: [embed] });
    }

    try {
      const response = await axios.get('https://complimentr.com/api');
      const compliment = response.data.compliment;

      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${user.tag} ${compliment}`,message.author.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL());

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching compliment:', error);

      const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription('An error occurred while fetching the compliment. Please try again later.');

      message.reply({ embeds: [embed] });
    }
  },
};
