const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const {reply} = require ("../../config.json")
module.exports = {
  name: 'top',
  description: 'Displays the top 10 users',
  
  run: async (client, message, args) => {
    
const trophyData = db.all().filter((data) => data.ID.startsWith(`trophies_`));
    const serverCoinData = db.all().filter((data) => data.ID.startsWith(`chatcoins_`));
    const globalCoinData = db.all().filter((data) => data.ID.startsWith('coins_'));

    const sortedtrophy = trophyData.sort((a, b) => b.data - a.data).slice(0, 10);
    const sortedServerCoins = serverCoinData.sort((a, b) => b.data - a.data).slice(0, 10);
    const sortedGlobalCoins = globalCoinData.sort((a, b) => b.data - a.data).slice(0, 10);

    const serverLeaderboardEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('💬 ChatCoins Leaderboard')
   //   .setDescription('Top 10 users with the highest coin balances in this server:')
 .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   
       
    for (const [index, data] of sortedServerCoins.entries()) {
      const userId = data.ID.replace('chatcoins_', '');
      const user = await message.client.users.fetch(userId);
      const member = message.guild.members.cache.get(userId);

      if (user) {
   const positionEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `🔸`;
         serverLeaderboardEmbed.addField(
          `${positionEmoji}  ${user.tag}`,
          `${reply} ChatCoins: **${data.data.toLocaleString()}**`
        );
      }
    }
//trophy
  const trophyEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('🏆 Trophies Leaderboard')
   //   .setDescription('Top 10 users with the highest coin balances in this server:')
 .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   
       
    for (const [index, data] of sortedtrophy.entries()) {
      const userId = data.ID.replace('trophies_', '');
      const user = await message.client.users.fetch(userId);
      const member = message.guild.members.cache.get(userId);

      if (user) {
        const positionEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `🔸`;
        trophyEmbed.addField(
          `${positionEmoji}  ${user.tag}`,
          `${reply} Trophies: **${data.data.toLocaleString()}**`
        );
      }
    }

    const globalLeaderboardEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle('📀 Coins Leaderboard')
    //  .setDescription('Top 10 users with the highest coin balances globally:')
 .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   
       
    for (const [index, data] of sortedGlobalCoins.entries()) {
      const userId = data.ID.replace('coins_', '');
      const user = await message.client.users.fetch(userId);

      if (user) {
    const positionEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `🔸`;    globalLeaderboardEmbed.addField(
          `${positionEmoji}  ${user.tag}`,
          `${reply} Coins: **${data.data.toLocaleString()}**`
        );
      }
    }

const globalButton = new MessageButton()
      .setCustomId('global')
   //   .setLabel('Coins')
      .setEmoji('📀')
      .setStyle('PRIMARY');

const trophyButton = new MessageButton()
      .setCustomId('trophy')
    //  .setLabel('Trophies')
      .setEmoji('🏆')
      .setStyle('PRIMARY');
    
    const serverButton = new MessageButton()
      .setCustomId('server')
    //  .setLabel('ChatCoins')
      .setEmoji('💬')
      .setStyle('PRIMARY');

    

    const row = new MessageActionRow()
      .addComponents(globalButton,serverButton,trophyButton);

    const leaderboardMessage = await message.channel.send({
      embeds: [globalLeaderboardEmbed],
      components: [row]
    });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = leaderboardMessage.createMessageComponentCollector({
      filter,
      time: 30000, // 30 seconds
    });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'server') {
        await interaction.update({
          embeds: [serverLeaderboardEmbed],
          components: [row]
        });
        } else if (interaction.customId === 'trophy') {
        await interaction.update({
          embeds: [trophyEmbed],
          components: [row]
        });
      } else if (interaction.customId === 'global') {
        await interaction.update({
          embeds: [globalLeaderboardEmbed],
          components: [row]
        });
      }
    });

    collector.on('end', async () => {
      await leaderboardMessage.edit({
        components: []
      });
    });
  },
};
