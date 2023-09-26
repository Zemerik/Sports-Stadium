
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward',
  category: 'economy',
  run: async (client, message, args) => {
    const authorId = message.author.id;
    const currentDate = new Date().toLocaleDateString();
    const lastClaimed = db.get(`last_claime_${authorId}`);
    const currentStreak = db.get(`streakk_${authorId}`);
    const isSameDay = lastClaimed === currentDate;

    if (isSameDay) {
   const lastClaimedDate = new Date(lastClaimed);
      const nextDayDate = new Date(lastClaimedDate.getTime() + 24 * 60 * 60 * 1000);
      const timeDiff = nextDayDate.getTime() - Date.now();
      const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
   
      
      const no = new Discord.MessageEmbed()
        .setAuthor(`You have already claimed your Daily reward today! You can claim it again in ${remainingHours} hour(s) and ${remainingMinutes} minute(s).`, message.author.displayAvatarURL())
        .setColor("YELLOW");

      message.reply({ embeds: [no] });
   
    } else {
      const lastClaimedDate = new Date(lastClaimed);
      const isYesterday = lastClaimedDate.getTime() === new Date(currentDate).setDate(new Date(currentDate).getDate() - 1);
      const streak = isYesterday ? currentStreak + 1 : 1;
      const rewardAmount = 2000 + 200 * (streak - 1);

      db.add(`coins_${authorId}`, rewardAmount);
      db.set(`last_claime_${authorId}`, currentDate);
      db.set(`streakk_${authorId}`, streak);

      const embed = new Discord.MessageEmbed()
        .setTitle('Daily Reward')
        
        .setColor('YELLOW')
        .setFooter('🏏')
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

      if (isYesterday) {
        embed.setDescription(`You have claimed ${rewardAmount.toLocaleString()} coins as your daily reward!\n\n**☑️ Streak Days: ${streak}**`)
      } else {
        embed.setDescription(`You have claimed ${rewardAmount.toLocaleString()} coins as your daily reward!\n\n**☑️ Streak Days: ${streak}**`)
      }

      message.channel.send({ embeds: [embed] });
    }
  },
}; 

