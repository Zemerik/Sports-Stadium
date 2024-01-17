const Discord = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unban a user from the server',
  category: 'moderation',
  run: async (client, message, args) => {

    const userID = args[0];
    if (!userID) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**Please provide the ID of the user to unban.**')
        .setColor('#ffff00');
      message.channel.send({ embeds: [embed] });
      return;
    }

    message.guild.bans.fetch().then((bans) => {
      const bannedUser = bans.find((ban) => ban.user.id === userID);
      if (!bannedUser) {
        const embed = new Discord.MessageEmbed()
          .setDescription('**The user with the provided ID is not banned.**')
          .setColor('#ffff00');
        message.channel.send({ embeds: [embed] });
        return;
      }

      message.guild.members.unban(bannedUser.user).then(() => {
      }).catch((error) => {
        console.error(error);
        const embed = new Discord.MessageEmbed()
          .setDescription('**There was an error unbanning the user. Please try again later.**')
          .setColor('RED');
        message.channel.send({ embeds: [embed] });
      });
    }).catch((error) => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setDescription('**There was an error fetching the bans. Please try again later.**')
        .setColor('RED');
      message.channel.send({ embeds: [embed] });
    });
  },
};
