const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { reply } = require('../../config.json');
const db = require('quick.db');

module.exports = {
  name: 'invites',
  description: 'invite tracking leaderboard with reset invites',
run: async (client, message, args) => {
  if (message.author.id === '910768559175639080') {

  const guild = message.guild;
  const serverId = guild.id;
  const currentInvites = await guild.invites.fetch();
  const resetInvites = db.get(`reset_invites_${serverId}`) || {}; // Get the previously saved reset invites for the server from the database

  const inviteCountsMap = new Map();

  currentInvites.forEach((invite) => {
    const user = invite.inviter;
    const inviteCode = invite.code;
    const inviteCount = invite.uses;
    const resetCount = resetInvites[inviteCode] || 0; // Get the reset invite count for the invite code
    const currentCount = inviteCount - resetCount; // Calculate the current invites by subtracting the reset invites
if (currentCount > 0) {
    const userKey = `${user.id}-${inviteCode}`; // Generate a unique key using user ID and invite code
    inviteCountsMap.set(userKey, currentCount); // Set the current invite count for the user's invite code
    }
  
  });

  const sortedInviteCounts = Array.from(inviteCountsMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setAuthor('Invites Leaderboard', client.user.displayAvatarURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter({ text: `Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();

  for (const [inviteKey, inviteCount] of sortedInviteCounts) {
    const [userId, inviteCode] = inviteKey.split('-');
    const user = await client.users.fetch(userId);
    const position = sortedInviteCounts.findIndex((entry) => entry[0] === inviteKey) + 1;
    const username = user ? `${user.username}#${user.discriminator}` : 'Unknown User';
    const positionEmoji = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '🔸';

  const cod = `[Invite Link](https://discord.gg/${inviteCode})`;
    embed.addField(`${positionEmoji}  ${username}`, `${reply} Invite Uses: ${inviteCount} | **${cod}**`);
  }
if (inviteCountsMap.size === 0) {
  embed.setDescription('No invites to display.');
    }
  const resetButton = new MessageButton()
    .setCustomId('reset_invites')
    .setLabel('🔃 Reset Invites')
    .setStyle('DANGER');

  const row = new MessageActionRow().addComponents(resetButton);

  const leaderboardMessage = await message.channel.send({ embeds: [embed], components: [row] });

  const collector = leaderboardMessage.createMessageComponentCollector({
    filter: (interaction) =>
      interaction.customId === 'reset_invites' && interaction.user.id === '910768559175639080',
    time: 20000, // 70 seconds
    max: 1,
  });

  collector.on('collect', (interaction) => {
    if (interaction.customId === 'reset_invites' && interaction.user.id === '910768559175639080') {
      // Save the current invite counts as reset invites for the server in the database
      const resetInvites = {};

      currentInvites.forEach((invite) => {
        const inviteCode = invite.code;
        const inviteCount = invite.uses;
        resetInvites[inviteCode] = inviteCount;
      });

      db.set(`reset_invites_${serverId}`, resetInvites);

      interaction.reply('Invites have been reset successfully.');
    }
  });
     // Handle collector expiration
    collector.on('end', collected => {
      // Disable the buttons after collector expiration
      //row.components.forEach(button => button.setDisabled(true));
      leaderboardMessage.edit({ components: [] });
    });
} else {
  const guild = message.guild;
  const serverId = guild.id;
  const currentInvites = await guild.invites.fetch();
  const resetInvites = db.get(`reset_invites_${serverId}`) || {}; // Get the previously saved reset invites for the server from the database

  const inviteCountsMap = new Map();

  currentInvites.forEach((invite) => {
    const user = invite.inviter;
    const inviteCode = invite.code;
    const inviteCount = invite.uses;
    const resetCount = resetInvites[inviteCode] || 0; // Get the reset invite count for the invite code
    const currentCount = inviteCount - resetCount; // Calculate the current invites by subtracting the reset invites
if (currentCount > 0) {
    const userKey = `${user.id}-${inviteCode}`; // Generate a unique key using user ID and invite code
    inviteCountsMap.set(userKey, currentCount); // Set the current invite count for the user's invite code
    }
  
  });

  const sortedInviteCounts = Array.from(inviteCountsMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setAuthor('Invites Leaderboard', client.user.displayAvatarURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter({ text: `Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();

  for (const [inviteKey, inviteCount] of sortedInviteCounts) {
    const [userId, inviteCode] = inviteKey.split('-');
    const user = await client.users.fetch(userId);
    const position = sortedInviteCounts.findIndex((entry) => entry[0] === inviteKey) + 1;
    const username = user ? `${user.username}#${user.discriminator}` : 'Unknown User';
    const positionEmoji = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '🔸';

  const cod = `[Invite Link](https://discord.gg/${inviteCode})`;
    embed.addField(`${positionEmoji}  ${username}`, `${reply} Invite Uses: ${inviteCount} | **${cod}**`);
  }
if (inviteCountsMap.size === 0) {
  embed.setDescription('No invites to display.');
    }
  

  const leaderboardMessage = await message.channel.send({ embeds: [embed]});

}
},
    }