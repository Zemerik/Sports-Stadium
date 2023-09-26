const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**You do not have permission to ban members.**')
        .setColor('#ffff00');

      message.channel.send({ embeds: [embed] });
      return;
    }

    let user;
    if (message.mentions.users.size > 0) {
      user = message.mentions.users.first();
    } else {
      const userID = args[0];
      if (!userID) {
        const embed = new Discord.MessageEmbed()
          .setDescription('**Please mention a user or provide a valid user ID to ban.**')
          .setColor('#ffff00');

        message.channel.send({ embeds: [embed] });
        return;
      }

      try {
        user = await client.users.fetch(userID);
      } catch (error) {
        const embed = new Discord.MessageEmbed()
          .setDescription('**Invalid user ID provided.**')
          .setColor('#ffff00');

        message.channel.send({ embeds: [embed] });
        return;
      }
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**The user is not a member of this server.**')
        .setColor('#ffff00');

      message.channel.send({ embeds: [embed] });
      return;
    }

    if (!member.bannable) {
      const embed = new Discord.MessageEmbed()
        .setDescription('**I cannot ban this user! Do they have a higher role than me?**')
        .setColor('#ffff00');

      message.channel.send({ embeds: [embed] });
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    member.ban({ reason }).then(() => {
      const embed = new Discord.MessageEmbed()
        .setDescription(`**☑️ Banned ${user.tag} from the server.**`)
        .addField('Reason', reason)
        .setColor('GREEN')
.setThumbnail(message.author.displayAvatarURL())
      message.channel.send({ embeds: [embed] });
    }).catch(error => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setDescription('**There was an error banning the user. Please try again later.**')
        .setColor('RED')
.setThumbnail(message.author.displayAvatarURL())
      message.channel.send({ embeds: [embed] });
    });
  },
};
