const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'work',
  
  description: 'claim your salary reward',
  category:"economy",
  run:async(client,message, args) =>{
    // Get the author's ID and the current date
      // Get the author's ID and the current date
    const authorId = message.author.id;

    // Check if the user has already worked today
    const lastWorked = db.get(`last_worked_${authorId}`);
    if (lastWorked) {
  

      const timeDiff = Date.now() - lastWorked;
      const minutesLeft = Math.floor((60 * 60 * 1000 - timeDiff) / 60000);
      if (minutesLeft > 0) {
     
       const o = new Discord.MessageEmbed ()
        . setAuthor(`You can work again in ${minutesLeft} minutes!`,message.author.displayAvatarURL()).setColor("ORANGE")
        message.channel.send({embeds:[o]})
      return;
      }
    }

    // Reward the user for working and update the database
    const rewardAmount = Math.floor(Math.random() * (3000 - 500 + 1)) + 500; // Set the reward amount here
    db.add(`coins_${authorId}`, rewardAmount);
    db.set(`last_worked_${authorId}`, Date.now());

    // Send a confirmation message to the user
    const sportsMessages = [
  `You scored a goal and earned ${rewardAmount} coins 📀`,
  `You hit a home run and got ${rewardAmount} coins 📀`,
  `You made an incredible save and received ${rewardAmount} coins 📀`,
  `You dunked the ball and earned ${rewardAmount} coins 📀`,
  `You served an ace and got ${rewardAmount} coins 📀`,
  `You made a perfect touchdown and earned ${rewardAmount} coins 📀`,
  `You won the race and received ${rewardAmount} coins 📀`,
  `You caught a fly ball and got ${rewardAmount} coins 📀`,
  `You made a hole-in-one and earned ${rewardAmount} coins 📀`,
  `You made an amazing pass and received ${rewardAmount} coins 📀`,
  `You hit a bullseye and got ${rewardAmount} coins 📀`,
  `You won the championship and earned ${rewardAmount} coins 📀`,
  `You aced the serve and received ${rewardAmount} coins 📀`,
  `You made a perfect jump shot and got ${rewardAmount} coins 📀`,
  `You scored a try and earned ${rewardAmount} coins 📀`,
  `You completed a perfect routine and received ${rewardAmount} coins 📀`,
  `You kicked a field goal and got ${rewardAmount} coins 📀`,
  `You won the match and earned ${rewardAmount} coins 📀`,
  `You made a fantastic catch and received ${rewardAmount} coins 📀`,
  `You hit a grand slam and got ${rewardAmount} coins 📀`,
  `You made a great block and earned ${rewardAmount} coins 📀`,
  `You ran a marathon and received ${rewardAmount} coins 📀`,
  `You scored a penalty and got ${rewardAmount} coins 📀`,
  `You won the gold medal and earned ${rewardAmount} coins 📀`,
  `You made an incredible dive and received ${rewardAmount} coins 📀`,
  `You hit a hole-in-one and got ${rewardAmount} coins 📀`,
  `You won the relay race and earned ${rewardAmount} coins 📀`,
  `You completed a perfect flip and received ${rewardAmount} coins 📀`,
  `You made a clutch shot and got ${rewardAmount} coins 📀`,
  `You scored a touchdown and earned ${rewardAmount} coins 📀`,
  `You won the game and received ${rewardAmount} coins 📀`,
  `You made an amazing save and got ${rewardAmount} coins 📀`,
  `You aced the shot and earned ${rewardAmount} coins 📀`,
  `You hit a perfect bullseye and received ${rewardAmount} coins 📀`,
  `You won the tournament and got ${rewardAmount} coins 📀`,
  `You made an unbelievable pass and earned ${rewardAmount} coins 📀`,
  `You scored a perfect goal and received ${rewardAmount} coins 📀`,
  `You won the race by a landslide and got ${rewardAmount} coins 📀`,
  `You caught a game-winning touchdown and earned ${rewardAmount} coins 📀`,
  `You hit a winning home run and received ${rewardAmount} coins 📀`,
  `You made an incredible dunk and got ${rewardAmount} coins 📀`,
  `You served a winning ace and earned ${rewardAmount} coins 📀`,
  `You made a game-saving block and received ${rewardAmount} coins 📀`,
  `You won the championship in dramatic fashion and got ${rewardAmount} coins 📀`,
  `You made an unbelievable pass to secure victory and earned ${rewardAmount} coins 📀`,
  `You hit a buzzer-beating shot to win the game and received ${rewardAmount} coins 📀`,
  `You scored the winning penalty in a shootout and got ${rewardAmount} coins 📀`,
  `You made an incredible diving catch to seal the victory and earned ${rewardAmount} coins 📀`,
  `You hit a game-winning grand slam in the bottom of the ninth and received ${rewardAmount} coins 📀`,
];
const rm = sportsMessages[Math.floor(Math.random() * sportsMessages.length)];

    const embed = new Discord.MessageEmbed()
    //  .setTitle('Work')
      .setAuthor(`${rm}`,message.author.displayAvatarURL())
 .setColor('YELLOW')

    message.channel.send({ embeds: [embed] });
  },
}; 
 
