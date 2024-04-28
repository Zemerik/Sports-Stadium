const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');
const { reply } = require("../../config.json");

module.exports = {
  name: 'shop',
  description: 'View and purchase items from the shop',
  run: async (client, message, args) => {
    // Retrieve the shop items from the database
    const shopItems = db.get('shop_items') || [];

    // Check if the shop is empty
    if (shopItems.length === 0) {
      const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setAuthor('The shop is currently empty', message.author.displayAvatarURL());

      message.channel.send({ embeds: [embed] });
      return;
    }

    const itemsPerPage = 1; // Number of items to display per page
    const totalPages = Math.ceil(shopItems.length / itemsPerPage);

    let page = 1; // Current page

    // Function to generate the embed with the items for the given page
    const buyButton = new MessageButton()
      .setCustomId('buy')
    .setStyle('SUCCESS')
    const generateEmbed = () => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      const embed = new MessageEmbed()
        .setColor('YELLOW')
     //   .setDescription('**Welcome to the shop!**');

      for (let i = start; i < end && i < shopItems.length; i++) {
        const item = shopItems[i];
        embed.addField(`${page} ⟩ ${item.name}`, `**📀 price: ${item.price}**`);
        embed.setImage(`${item.emoji}`);
        embed.setColor("RANDOM");

        
    buyButton.setLabel(`Buy ${item.name}`)
      
      }
//embed.setFooter(`Total Cards: ${page}/${totalPages}`);

      return embed;
    };

    const buttonsRow = new MessageActionRow();

    // Add page buttons
    const firstPageButton = new MessageButton()
      .setCustomId('first_page')
      .setLabel('⟨⟨ First')
      .setStyle('PRIMARY');

    const previousPageButton = new MessageButton()
      .setCustomId('previous_page')
      .setLabel('⟨ Previous')
      .setStyle('PRIMARY');

    const nextPageButton = new MessageButton()
      .setCustomId('next_page')
      .setLabel('Next ⟩')
      .setStyle('PRIMARY');

    const lastPageButton = new MessageButton()
      .setCustomId('last_page')
      .setLabel('Last ⟩⟩')
      .setStyle('PRIMARY');

    buttonsRow.addComponents(firstPageButton, previousPageButton, nextPageButton, lastPageButton);

    /* Add buy button
    const buyButton = new MessageButton()
      .setCustomId('buy')
      .setLabel(`Buy ${shopItems[0].name}`)
      .setStyle('SUCCESS');*/

    const buyButtonsRow = new MessageActionRow().addComponents(buyButton);

    const shopMessage = await message.channel.send({ embeds: [generateEmbed()], components: [buttonsRow, buyButtonsRow] });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = shopMessage.createMessageComponentCollector({ filter, time: 20000 });

    collector.on('collect', async (interaction) => {
      try {
        if (interaction.customId === 'first_page') {
          page = 1;
        } else if (interaction.customId === 'previous_page') {
          page = Math.max(1, page - 1);
        } else if (interaction.customId === 'next_page') {
          page = Math.min(totalPages, page + 1);
        } else if (interaction.customId === 'last_page') {
          page = totalPages;
        } else if (interaction.customId === 'buy') {
          const selectedItem = shopItems[(page - 1) * itemsPerPage];

          // Deduct the price from the user's coins
          const userCoins = db.get(`coins_${message.author.id}`) || 0;
const no = new MessageEmbed ()
          . setAuthor ('You do not have enough coins to purchase this item',message.author.displayAvatarURL()).setColor("RED")


          if (userCoins < selectedItem.price) {
            await interaction.reply({ embeds:[no], ephemeral: true });
            return;
          }

          const updatedCoins = userCoins - selectedItem.price;
          db.set(`coins_${message.author.id}`, updatedCoins);

          // Add the purchased item to the user's inventory
          const userInventory = db.get(`inventory4_${message.author.id}`) || [];
          const newItem = { emoji: selectedItem.emoji, name: selectedItem.name, tier:selectedItem.tier };
          userInventory.push(newItem);
          db.set(`inventory4_${message.author.id}`, userInventory);

          // Update the buy button label
          buyButton.setLabel(`Purchased ${selectedItem.name}`);
          buyButton.setDisabled(true);
const purc = new MessageEmbed ()
          .setDescription(`**You have purchased ${selectedItem.name} for ${selectedItem.price} coins**`)
          .setImage(`${selectedItem.emoji}`)
          . setColor ("GREEN")
          await interaction.reply({ embeds:[purc], ephemeral: true });
        }

        // Update the embed and buttons
        const updatedEmbed = generateEmbed();
        await interaction.update({ embeds: [updatedEmbed], components: [buttonsRow, buyButtonsRow] });
      } catch (error) {
        if (error.message.includes('[INTERACTION_ALREADY_REPLIED]')) {
          // The interaction has already been acknowledged, ignore the error
          return;
        }
        // Handle other errors here
       // console.error(error);
      }
    });

    collector.on('end', () => {
      // Remove the buttons after the collector ends
      shopMessage.edit({ components: [] });
    });
  },
};
