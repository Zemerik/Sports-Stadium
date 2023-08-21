const Discord = require('discord.js');

module.exports = {
  name: 'unlock',
  description: 'Enable sending messages in a channel',
  category:"moderation",
  run:async(client,message, args)=> {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Permission Error')
        .setDescription('You do not have permission to manage channels.')
        .setColor('#00ff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔓')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    
    if (!channel) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Input Error')
        .setDescription('Please mention a valid channel to unlock.')
        .setColor('#00ff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔓')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SEND_MESSAGES: true,
    }).then(() => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Channel Unlocked')
        .setDescription(`${channel} has been unlocked by ${message.author.tag}.`)
        .setColor('#00ff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔓')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }).catch(error => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('There was an error unlocking the channel. Please try again later.')
        .setColor('#00ff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔓')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    });
  },
}; 
