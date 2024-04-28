const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const axios = require('axios');

// Fetch cricket news function
const fetchCricketNews = async () => {
  try {
    const response = await axios.get(
      'https://newsapi.org/v2/top-headlines?country=in&category=sports&q=cricket',
      {
        headers: {
          'X-Api-Key': 'fa02241965254c6293a200efac4f5187',
        },
      }
    );

    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error('Error fetching cricket news:', error.message);
    throw error;
  }
};

module.exports = {
  name: 'news',
  description: 'Fetches cricket news',
  run: async (client, message, args) => {
    try {
      const news = await fetchCricketNews();

      let currentIndex = 0;
      const totalNews = news.length;

      // Function to create the embed for a specific news article
      const createNewsEmbed = (index) => {
        const article = news[index];

        const embed = new MessageEmbed()
          .setTitle(`${article.title}`)
          .setDescription(`${article.content}`)/*.substring(0, 2048) + '...'*/
          .setColor('RANDOM')
          .setURL(article.url)
          .setFooter(`News ${index + 1} of ${totalNews}`, message.author.displayAvatarURL());

        if (article.urlToImage && isValidURL(article.urlToImage)) {
          try {
            embed.setImage(article.urlToImage);
          } catch (error) {
            console.error(`Error setting image for news ${index + 1}:`, error);
            embed.addField('🛑 Image Error', 'No image available for this news article.');
          }
        } else {
          embed.addField('🛑 Image Not Found', 'No image available for this news article.');
        }

        return embed;
      };

      const isValidURL = (url) => {
        try {
          new URL(url);
          return true;
        } catch (error) {
          return false;
        }
      };

      // Send the initial news embed
      const newsEmbed = createNewsEmbed(currentIndex);
      const messageSent = await message.channel.send({ embeds: [newsEmbed] });

      // Create button components
      const previousButton = new MessageButton()
        .setCustomId('previous')
        .setLabel('⬅️ Previous')
        .setStyle('PRIMARY')
        .setDisabled(true);
      const nextButton = new MessageButton()
        .setCustomId('next')
        .setLabel('➡️ Next')
        .setStyle('PRIMARY');
      const deleteButton = new MessageButton()
        .setCustomId('delete')
        .setLabel('🗑️ Delete')
        .setStyle('DANGER');

      // Create action row with buttons
      const actionRow = new MessageActionRow().addComponents([previousButton, nextButton, deleteButton]);

      // Update the message with the action row
      await messageSent.edit({ embeds: [newsEmbed], components: [actionRow] });

      // Collect button interactions
      const filter = (i) => i.user.id === message.author.id;
      const collector = messageSent.createMessageComponentCollector({ filter, time: 280000 });

      // Handle button interactions
      collector.on('collect', async (interaction) => {
        if (interaction.replied) return; // Check if the interaction has already been replied to

        await interaction.deferUpdate();

        if (interaction.customId === 'previous') {
          currentIndex--;
        } else if (interaction.customId === 'next') {
          currentIndex++;
        } else if (interaction.customId === 'delete') {
          messageSent.delete();
          return;
        }

        // Update the news embed based on the new index
        const updatedNewsEmbed = createNewsEmbed(currentIndex);
        await messageSent.edit({ embeds: [updatedNewsEmbed] });

        // Update button states based on the index
        previousButton.setDisabled(currentIndex === 0);
        nextButton.setDisabled(currentIndex === totalNews - 1);

        // Update the message with the updated action row
        await messageSent.edit({ components: [actionRow] });
      });

      // Collector timeout event
      collector.on('end', () => {
        actionRow.components.forEach((component) => {
          component.setDisabled(true);
        });
        messageSent.edit({ components: [actionRow] });
      });

      console.log('Cricket news sent successfully!');
    } catch (error) {
      console.error('Error fetching or sending cricket news:', error.message);
      message.channel.send(`There was an error while fetching cricket news. Please try again later\n>>> ${error.message}`);
}
  },
};
