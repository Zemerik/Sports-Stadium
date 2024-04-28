const { MessageActionRow, MessageButton } = require('discord.js');
const playedUsers = new Set();
const Discord = require("discord.js")


module.exports = {
  name: 'rps',
  description: 'Play rock-paper-scissors!',
  run:async(client, message, args) => {
    
    
    const playGame = async () => {
      const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * choices.length);
      const botChoice = choices[randomIndex];
 
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('rock')
            .setLabel('Rock')
            .setStyle('PRIMARY')
        )
        .addComponents(
          new MessageButton()
            .setCustomId('paper')
            .setLabel('Paper')
            .setStyle('PRIMARY')
        )
        .addComponents(
          new MessageButton()
            .setCustomId('scissors')
            .setLabel('Scissors')
            .setStyle('PRIMARY')
        );
 
      const prompt = await message.reply({
        content: 'Choose your weapon!',
        components: [row],
        ephemeral: true,
      });
 
      const filter = (interaction) => {
        return `${interaction.user.id}` === `${message.author.id}`;
      };
 
      const collector = prompt.channel.createMessageComponentCollector({
        filter,
        time: 10000,
      });
 
      collector.on('collect', async (message) => {
        const userChoice = message.customId;
 
        let result;
 
        if (botChoice === userChoice) {
          result = "It's a tie!";
        } else if (
          (botChoice === 'rock' && userChoice === 'scissors') ||
          (botChoice === 'paper' && userChoice === 'rock') ||
          (botChoice === 'scissors' && userChoice === 'paper')
        ) {
          result = 'I win!';
        } else {
          result = 'You win!';
        }
 
        const X = `I chose ${botChoice} And You ${userChoice}. So ${result}`;
 
        await message.update({ content: X, components: [] });
        collector.stop();
 
        playedUsers.add(message.author);
 
        const newCollector = prompt.channel.createMessageComponentCollector({
          filter,
          time: 10000,
        });
 
        newCollector.on('end', () => {
          playedUsers.delete(message.author);
        });
      });
 
      collector.on('end', async (collected) => {
        if (collected.size === 0) {
          await prompt.edit({ content: "Time's up!", components: [] });
        }
      });
    };
    await playGame();
  }
                   }
                                                  
      