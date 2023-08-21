const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const cooldowns = new Map();

module.exports = {
  name: 'toss',
  description: 'toss a coin and bet your coins on the outcome.',
  run:async(client,message, args) =>{

const cooldownDuration = 10000; // 8 seconds cooldown

    // Check if the user is on cooldown
    if (cooldowns.has(message.author.id)) {
      const timeLeft = cooldowns.get(message.author.id) - Date.now();
      if (timeLeft > 0) {
        const cooldownEmbed = new MessageEmbed()
          .setColor('#ffff00')
        //  .setTitle('Cooldown')
          .setAuthor(`Please wait ${Math.ceil(timeLeft / 1000)} seconds before using the command again`,message.author.displayAvatarURL());
        return message.reply({ embeds: [cooldownEmbed] });
      }
    }


    
    const amount = parseInt(args[0]);
    const choice = args[1] || 'heads';

    // Check if amount is a valid number between 1 and 100,000
    if (isNaN(amount) || amount < 1 || amount > 100000) {
      const errorEmbed = new MessageEmbed()
        .setColor('#ffff00')
       // .setTitle('Invalid Amount')
        .setAuthor('Please provide a valid amount between 1 and 100,000',message.author.displayAvatarURL());
      return message.reply({ embeds: [errorEmbed] });
    }

    // Retrieve user's current coin balance from the database
    const userId = message.author.id;
    const userCoins = db.get(`coins_${userId}`) || 0;

    // Check if the user has enough coins to place the bet
    if (amount > userCoins) {
      const errorEmbed = new MessageEmbed()
        .setColor('#ffff00')
     //   .setTitle('Insufficient Balance')
        .setAuthor("You don't have enough coins to place that bet",message.author.displayAvatarURL());
      return message.reply({ embeds: [errorEmbed] });
    }

       // Create a spinning coin message
    const spinningEmbed = new MessageEmbed()
      .setColor('#ffff00')
      .setAuthor('Spinning the coin...',"https://images-ext-1.discordapp.net/external/QzNLVBMPfZZTd-z1gsOyLRxpAWIhpZI_0Is2K7iSy2I/https/cdn.discordapp.com/emojis/1124207119634280448.gif")
    //. setThumbnail ("")
    //.setDescription("_ _ _ _ _ _ <a:toss:1124207119634280448>") 

    // Send the spinning coin message
    const spinningMessage = await message.reply({ embeds: [spinningEmbed] });

    // Delay the result message by 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate a random outcome: 0 for heads, 1 for tails
    const outcome = Math.floor(Math.random() * 2);
    const outcomeText = outcome === 0 ? 'heads' : 'tails';

    // Determine if the user won or lost
    const win = outcomeText === choice.toLowerCase();
    const winnings = win ? amount : -amount;

    // Update user's coin balance in the database
    db.add(`coins_${userId}`, winnings);

    // Create the result message
    const resultEmbed = new MessageEmbed()
      .setColor('#ffff00')
      //.setTitle('Coin Flip Result')
      .setAuthor(`The coin landed on ${outcomeText} ${choice.toLowerCase() === outcomeText ? 'You won!' : 'You lost.'} ${amount} 📀coins`,message.author.displayAvatarURL())
    //  .addField('Amount', amount)
    //  .addField('Winnings', winnings)
    //  .addField('Balance', userCoins + winnings);

    // Edit the spinning coin message with the result
    spinningMessage.edit({ embeds: [resultEmbed] });

    cooldowns.set(message.author.id, Date.now() + cooldownDuration);
    setTimeout(() => cooldowns.delete(message.author.id), cooldownDuration);

  },
};
