const Discord = require('discord.js');

module.exports = {
  name: 'lock',
  description: 'Disable sending messages in the channel',
  category:"moderation",
  run:async(client,message, args)=> {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Permission Error')
        .setDescription('You do not have permission to manage channels.')
        .setColor('#ff0000')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔒')
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
      SEND_MESSAGES: false,
    }).then(() => {
      const embed = new Discord.MessageEmbed()
        .setTitle('Channel Locked')
        .setDescription(`This channel has been locked by ${message.author.tag}.`)
        .setColor('#ff0000')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔒')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }).catch(error => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('There was an error locking the channel. Please try again later.')
        .setColor('#ff0000')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🔒')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    });
  },
}; 
