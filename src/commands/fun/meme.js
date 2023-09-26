const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios');

const defaultSubredditName = 'CricketShitpost'; // Default subreddit if not specified by the user
const memesLimit = 1000; // Number of memes to fetch at once

let currentIndex = -1;
let memes = [];

async function fetchMemes(subredditName) {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${subredditName}/top.json?sort=top&t=week&limit=${memesLimit}`);

    memes = response.data.data.children
      .filter(post => post.data.post_hint === 'image')
      .map(post => ({
        title: post.data.title,
        url: post.data.url,
        ups: post.data.ups,
        downs: post.data.downs
      }));

    shuffleArray(memes); // Shuffle the memes array
    currentIndex = 0;

    console.log(`Fetched ${memes.length} memes from Reddit`);
  } catch (error) {
    console.error('An error occurred while fetching memes from Reddit:', error);
    const no = new MessageEmbed ()
    .setTitle("Not Found Pls Try Again Later").setColor("RANDOM")
  }
}

module.exports = {
  name: 'meme',
  description: 'Displays a random meme from a specified or default subreddit.',
  run:async(client,message, args) =>{
    const subredditName = args.join(" ") || defaultSubredditName;

    await fetchMemes(subredditName);

    // Get the current meme
    const meme = memes[currentIndex];

    // Create a message embed
    const embed = new MessageEmbed()
      .setColor('#ffff00') // Set embed color to yellow
      .setTitle(`${meme.title}`)
      .setImage(`${meme.url}`)
      .setFooter(`👍 ${meme.ups} | 👎 ${meme.downs}`)

    // Create the action row with buttons
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('next').setLabel('Next').setStyle('PRIMARY').setEmoji("🔃"),
      new MessageButton().setCustomId('delete').setLabel('Delete').setEmoji("🗑️").setStyle('DANGER')
    );

    // Send the initial embed and action row as a reply
    const sentMessage = await message.reply({ embeds: [embed], components: [row] });

    // Create a collector for button interactions
    const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;
    const collector = sentMessage.createMessageComponentCollector({
      componentType: 'BUTTON',
      filter,
      time: 180000, 

 // Collect buttons for 1 minute
    });

    // Handle button interactions
    collector.on('collect', async interaction => {
      if (interaction.customId === 'next') {
        currentIndex++;
        if (currentIndex >= memes.length) currentIndex = 0;

        // Update the meme embed with the next meme
        const nextMeme = memes[currentIndex];
      embed.setTitle(nextMeme.title);
        embed.setImage(nextMeme.url);
        embed.setFooter(`👍 ${nextMeme.ups} | 👎 ${nextMeme.downs}`);

        await interaction.update({ embeds: [embed] });
      } else if (interaction.customId === 'delete') {
        // Delete the meme message
        sentMessage.delete();
      }
    });

    // Handle collector expiration
    collector.on('end', collected => {
      // Disable the buttons after collector expiration
      //row.components.forEach(button => button.setDisabled(true));
      sentMessage.edit({ components: [] });
    });
  },
};

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
