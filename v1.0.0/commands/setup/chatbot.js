const { MessageActionRow, MessageButton, MessageEmbed, MessageCollector } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'setchatbot',
  description: 'Set or remove the chatbot channel',
  run:async(client,message, args) =>{
if (message.author.id !== "665181723276869655") return;

  /*   if (!message.member.permissions.has('ADMINISTRATOR')) {


      const embed = new MessageEmbed()
        .setTitle('Permission Error')
        .setDescription('**You do not have permission to ADMINISTRATOR**')
        .setColor('RED')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('❎')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }*/

    const mentionedChannels = message.mentions.channels;
    if (mentionedChannels.size > 0) {
      const channel = mentionedChannels.first();

      // Save the channel ID in the database
      db.set(`chatbotChannel_${message.guild.id}`, channel.id);

      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Chatbot Channel Set')
        .setDescription(`Chatbot channel has been set to ${channel}.`);

      message.channel.send({ embeds: [embed] });
    } else {
      const currentChatbotChannelId = db.get(`chatbotChannel_${message.guild.id}`);
      if (currentChatbotChannelId) {
        const currentChatbotChannel = message.guild.channels.cache.get(currentChatbotChannelId);
        const embed = new MessageEmbed()
          .setColor('YELLOW')
          .setTitle('Chatbot Channel Already Set')
          .setDescription(`Chatbot channel is already set to ${currentChatbotChannel}.`)
          .setFooter('To remove the chatbot channel, use the Remove Channel button below.');

        const removeButton = new MessageButton()
          .setCustomId('removeChannelButton')
          .setLabel('Remove Channel')
          .setStyle('DANGER');

        const row = new MessageActionRow().addComponents(removeButton);

        message.channel.send({ embeds: [embed], components: [row] }).then((sentMessage) => {
          const filter = (interaction) => interaction.user.id === message.author.id;
          const collector = sentMessage.createMessageComponentCollector({ filter, max: 1 });

          collector.on('collect', (interaction) => {
            const replyEmbed = new MessageEmbed().setColor('YELLOW');

            if (interaction.customId === 'removeChannelButton') {
              // Logic to remove the chatbot channel
              db.delete(`chatbotChannel_${message.guild.id}`);

              replyEmbed.setDescription('Chatbot channel has been removed.');
              interaction.reply({ embeds: [replyEmbed] });
            }
          });
        });
      } else {
        let errorMessage;
        if (args.length === 0) {
          errorMessage = 'No channel mentioned. Please mention a channel to set as the chatbot channel.';
        } else {
          errorMessage = 'Invalid channel mentioned. Please mention a valid channel to set as the chatbot channel.';
        }

        const embed = new MessageEmbed()
          .setColor('YELLOW')
          .setTitle('Invalid Channel')
          .setDescription(errorMessage);

        message.channel.send({ embeds: [embed] });
      }
    }
  }
};
