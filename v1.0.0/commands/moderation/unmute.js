const Discord = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Unmute a user in the server',
  category:"moderation",
  run:async(client,message, args)=> {
   if (!message.member.permissions.has('MUTE_MEMBERS')) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Permission Error')
        .setDescription('You do not have permission to Unmute Members.')
        .setColor('#ffff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    const member = message.mentions.members.first();
    if (!member) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Input Error')
        .setDescription('Please mention a valid member of this server.')
        .setColor('#ffff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

if (!member.manageable) {
      const embed = new Discord.MessageEmbed()
   .setTitle("Permission Error")             .setDescription('**I cannot unmute this user! Do they have a higher role than me?**')
        .setColor('#ffff00')
.setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();
message.channel.send({ embeds: [embed] });
      return;
          }

    
    const muteRoleName = 'Muted'; // Replace with your desired mute role name
    const muteRole = message.guild.roles.cache.find(role => role.name === muteRoleName);

    if (!muteRole) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Mute Role Error')
        .setDescription('The server does not have a mute role configured.')
        .setColor('#ffff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    if (!member.roles.cache.find(r => r.name === muteRoleName)) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Mute Error')
        .setDescription(`${member.user.tag} is not muted.`)
        .setColor('#ffff00')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    member.roles.remove(muteRole, reason).then(() => {
      const embed = new Discord.MessageEmbed()
      //  .setTitle('Unmute Confirmation')
        .setDescription(`**${member.user.tag} has been unmuted.**`)
        .addField('Reason', reason)
        .setColor('GREEN')
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }).catch(error => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('There was an error unmuting the member. Please try again later.')
        .setColor('RED')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    });
  },
}; 
