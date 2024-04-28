const Discord = require('discord.js');
const {MessageEmbed}= require("discord.js")

module.exports = {
  name: 'mute',
  description: 'Mute a user in the server',
  category:"moderation",
    run:async(client,message, args)=> {
      if (!message.member.permissions.has('MUTE_MEMBERS')) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Permission Error")
        .setDescription('You do not have permission to Mute Members.')
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
        .setTitle("Mention Error")
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
   .setTitle("Permission Error")             .setDescription('**I cannot mute this user! Do they have a higher role than me?**')
        .setColor('#ffff00')
.setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();
message.channel.send({ embeds: [embed] });
      return;
          }
  
    const reason = args.slice(1).join(' ') || 'No reason provided';

    // Create the mute role if it doesn't exist
    const muteRoleName = 'Muted'; // Replace with your desired mute role name
    let muteRole = message.guild.roles.cache.find(role => role.name === muteRoleName);
   // If the "Muted" role doesn't exist, create it
    if (!muteRole) {
      try {
        const newRole = await message.guild.roles.create({
          name: 'Muted',
          permissions: [],
        });

        // Loop through each channel and deny the "Muted" role permissions to send messages
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.permissionOverwrites.create(newRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });

        muteRole = newRole;
   
      } catch (error) {
        console.error(error);
        const embed = new Discord.MessageEmbed()
          .setTitle("Role Error")
          .setDescription('There was an error creating the mute role. Please try again later.')
          .setColor('#ffff00')
          .setThumbnail(message.author.displayAvatarURL())
          .setFooter('🏏')
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
        return;
      }
    }

    // Mute the member and send a confirmation message
    try {
      await member.roles.add(muteRole);
      const embed = new Discord.MessageEmbed()
        .setDescription(`**${member.user.tag} has been muted.**`)
        .setColor('GREEN')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Reason', reason)
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        .setTitle('There was an error muting the member. Please try again later.')
        .setColor('RED')
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter('🏏')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  },
}; 