const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'roast',
  description: 'Roast a user!',
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if (!user) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('You must mention a user to roast!');

      return message.reply({ embeds: [embed] });
    }

    try {
      const response = await axios.get('https://insult.mattbas.org/api/insult');
      const insult = response.data;

      const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setAuthor(`${user.tag} ${insult}`,message.author.displayAvatarURL())
      . setThumbnail (user.displayAvatarURL())
      //  .setFooter(`Roasted by ${message.author.username}`, message.author.displayAvatarURL());

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching insult:', error);

      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('An error occurred while fetching the insult. Please try again later.');

      message.reply({ embeds: [embed] });
    }
  },
};
