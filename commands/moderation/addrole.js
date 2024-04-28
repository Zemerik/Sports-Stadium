const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'addrole',
  description: 'Add a role to a user.',
  run:async(client,message, args) =>{



  
    // Check if the command was used correctly
    if (args.length !== 2) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('Invalid command usage. Please use: **ssaddrole <user> <role>**');
      return message.reply({ embeds: [embed] });
    }

    let targetUser = message.mentions.members.first();
      

    let roleName = args[1];
    let role;

    // Check if the target user is mentioned or specified by ID
    if (!targetUser) {
      targetUser = message.guild.members.cache.get(args[0]);
    }

    // Check if the role is mentioned or specified by ID
    if (!targetUser || !roleName) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('Invalid user or role.');
      return message.reply({ embeds: [embed] });
    }

    // Find the role by mention or ID
    role = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === roleName) || message.guild.roles.cache.get(roleName);


    // Check if the role exists
    if (!role) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('Invalid role.');
      return message.reply({ embeds: [embed] });
    }
  if (!role.editable || role.comparePositionTo(message.member.roles.highest) > 0) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('You do not have the necessary permissions to add this role.');
      return message.reply({ embeds: [embed] });
        }
    try {
      targetUser.roles.add(role);
      
    } catch (error) {
      console.error(error);
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('An error occurred while adding the role.');
      return message.reply({ embeds: [embed] });
    }
  },
};
