const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'give',
  description: 'Give money to another user',
  usage: 'give <user> <amount>',
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    const amount = parseInt(args[1]);
if(!user) {
 const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('**Please provide a valid user to give**');

      return message.reply({ embeds: [embed] }); 
}
    if (isNaN(amount) || amount <= 0) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('**Please provide a valid amount to give**');

      return message.reply({ embeds: [embed] });
    }

    const senderBalance = db.get(`coins_${message.author.id}`) || 0;
    const recipientBalance = db.get(`coins_${user.id}`) || 0;

    // Check if the sender has enough balance to give
    if (senderBalance < amount) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('**You do not have enough balance to give that amount**');

      return message.reply({ embeds: [embed] });
    }

    db.subtract(`coins_${message.author.id}`, amount);

    db.add(`coins_${user.id}`, amount);

    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(`Successfully gave ${amount} coins to ${user.tag}`,message.author.displayAvatarURL());

    message.channel.send({ embeds: [embed] });
  },
};
