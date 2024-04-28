const Discord = require('discord.js');
const {MessageEmbed}= require("discord.js")

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  category:"moderation",
  run:async(client,message, args)=> {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      const embed = new Discord.MessageEmbed()
       
        .setDescription('**You do not have permission to kick members.**')
        .setColor('#ffff00')
        

      message.channel.send({ embeds: [embed] });
      return;
    }

    const member = message.mentions.members.first();
    if (!member) {
      const embed = new Discord.MessageEmbed()
        
        .setDescription('**Please mention a valid member of this server.**')
        .setColor('#ffff00')
        

      message.channel.send({ embeds: [embed] });
      return;
    }

    if (!member.kickable) {
      const embed = new Discord.MessageEmbed()
        
        .setDescription('**I cannot kick this user! Do they have a higher role than me?**')
        .setColor('#ffff00')
        

      message.channel.send({ embeds: [embed] });
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    member.kick(reason).then(() => {
      const embed = new Discord.MessageEmbed()
  
        .setDescription(`**☑️ | Kicked ${member.user.tag} from the server.**`)
        .addField('Reason', reason)
        .setColor('GREEN')
        .setThumbnail(member.user.displayAvatarURL());

      message.channel.send({ embeds: [embed] });
    }).catch(error => {
      console.error(error);
      const embed = new Discord.MessageEmbed()
        
        .setDescription('**There was an error kicking the member. Please try again later.**')
        .setColor('RED')
        .setThumbnail(message.author.displayAvatarURL());

      message.channel.send({ embeds: [embed] });
    });
  },
}; 
