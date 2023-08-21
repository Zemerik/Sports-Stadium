const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'monthly',
  
  description: 'Claim monthly reward',
  category:"economy",
  run:async(client,message, args) =>{

const authorId = message.author.id;

// Check if the user has already worked this month
const lastWorked = db.get(`lastmonth_${authorId}`);
if (lastWorked) {
  const timeDiff = Date.now() - lastWorked;
   const daysLeft = Math.floor((30 * 24 * 60 * 60 * 1000 - timeDiff) / (24 * 60 * 60 * 1000));
  
 // console.log(daysLeft)
  if (daysLeft > 0) {
    const o = new Discord.MessageEmbed()
    . setAuthor (`You have already collected your monthly reward this month. Come back in ${daysLeft} day(s) to claim the next one!`,message.author.displayAvatarURL()).setColor("ORANGE")
    message.channel.send({ embeds: [o] });
    return;
  }
 } 
    
      // Reward the user and update the database
      const rewardAmount = 40000; // Set the reward amount here
      db.add(`coins_${authorId}`, rewardAmount);
      
      // Send a confirmation message to the user
      const embed = new Discord.MessageEmbed()
      //  .setTitle('Monthly Reward')
        .setAuthor(`You have claimed ${rewardAmount} coins as your Monthly reward!`,message.author.displayAvatarURL())
        .setColor('YELLOW')
//.setFooter("🏏")
//.setTimestamp()  
 //  .setThumbnail(
            //message.author.displayAvatarURL({ dynamic: true })
  //        )   

      message.channel.send({ embeds: [embed] });
  db.set(`lastmonth_${authorId}`, Date.now());
  
  },
}; 
