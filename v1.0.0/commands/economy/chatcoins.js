const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'chatcoins',
  description: 'Check your chatting coins',
  run: async (client, message, args) => {
    const userId = message.author.id;
    
const guildId = '1019544819133054976';
const guild = client.guilds.cache.get(guildId);


    const chatCoins = db.get(`chatcoins_${userId}`) || 0;
   // const serverCoins = db.get(`coins_${serverId}_${userId}`) || 0;

    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setAuthor(`${message.author.username}'s chatting coins`, message.author.displayAvatarURL())
     
      .addField(`📀 Chatting Coins: ${chatCoins}`, "**Join this server [Click Here To Join](https://discord.gg/9atA4QQS3Q) and start chatting to get random amounts of coins!**")
   .setThumbnail (message.author.displayAvatarURL({dynamic:true}))  
     // .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
