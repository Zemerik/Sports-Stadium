const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'removerole',
  description: 'Remove a role from a user.',
  run:async(client,message, args) =>{
    // Check if the user has the necessary permissions to remove roles
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('You do not have permission to remove roles.');
      return message.reply({ embeds: [embed] });
    }

    // Check if the bot has the necessary permissions to remove roles
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('I do not have permission to remove roles.');
      return message.reply({ embeds: [embed] });
    }

    // Check if the command was used correctly
    if (args.length !== 2) {
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('Invalid command usage. Please use: **ssremoverole <user> <role>**');
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
        .setDescription('You do not have the necessary permissions to remove this role.');
      return message.reply({ embeds: [embed] });
                            }
    try {
      targetUser.roles.remove(role);
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription(`**☑️ Removed the role ${role} from ${targetUser}**`);
      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription('An error occurred while removing the role.');
      return message.reply({ embeds: [embed] });
    }
  },
};
