const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { reply } = require('../../config.json');
const db = require('quick.db');

module.exports = {
  name: 'inventory',
  description: 'View your inventory',
  run: async (client, message, args) => {
    // Retrieve the user's inventory from the database
    const inventory = db.get(`inventory4_${message.author.id}`) || [];
    

    // Create an array to store multiple pages of the inventory embed
    const embedPages = [];

    // Create an embed to display the inventory
    const embed = new MessageEmbed()
      //.setAuthor(`${message.author.username}'s Inventory`, client.user.displayAvatarURL())
      .setColor('YELLOW')
      //.setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter({ text: `${message.author.username}'s inventory`, iconURL: message.author.displayAvatarURL() })
    //  .setTimestamp();

    const zero = new MessageEmbed()
      .setColor('ORANGE')
      .setAuthor(`${message.author.username}'s Inventory Is Empty`, message.author.displayAvatarURL());

    if (inventory.length === 0) return message.channel.send({ embeds: [zero] });

    // Count the quantities of each item
    const counts = {};
    inventory.forEach(function (item) {
      counts[item.name] = (counts[item.name] || 0) + 1;
    });
//
if (Object.keys(counts).length === 1) {
  const [itemName, quantity] = Object.entries(counts)[0];
  const item = inventory.find((item) => item.name === itemName);
 // embed.addField(` 1 ⟩ ${itemName}`,`**${reply}Quantity: ${quantity}**`);
  embed.setDescription(`**🔸 ${itemName} ・ ${quantity}**`)
  embed.setImage(item.emoji);
  embed.setColor("RANDOM");
  return message.channel.send({ embeds: [embed] });
}


    // Loop through each item and display its name and quantity
    let pageIndex = 0;
    const itemsPerPage = 1; // Adjust the number of items per page as needed
    const itemEntries = Object.entries(counts);
    for (let i = 0; i < itemEntries.length; i += itemsPerPage) {
      const embedPage = new MessageEmbed(embed)
      
      embedPage.fields = [];

      for (let j = i; j < i + itemsPerPage && j < itemEntries.length; j++) {
        const [itemName, quantity] = itemEntries[j];

        const fou = inventory.find((item) => item.name === itemName);
     //   embedPage.addField(`${page} ⟩ ${itemName}`, `**${reply}Quantity: ${quantity}**`)
   embedPage.setDescription(`**🔸 ${itemName} ・ ${quantity}**`) 
     embedPage.setImage(`${fou.emoji}`)
        embedPage.setColor("RANDOM")
       // embedPage.setFooter({ text: `${message.author.username}'s inventory`, iconURL: message.author.displayAvatarURL() })
      }

      embedPages.push(embedPage);
    }

    // Create buttons to navigate through pages
    const buttons = [];
    const maxPageIndex = embedPages.length - 1;
    if (embedPages.length > 1) {
      const firstButton = new MessageButton()
        .setCustomId('first_page')
        .setLabel('⟨⟨ First')
        .setStyle('PRIMARY');
      buttons.push(firstButton);

      const previousButton = new MessageButton()
        .setCustomId('previous_page')
        .setLabel('⟨ Previous')
        .setStyle('PRIMARY');
      buttons.push(previousButton);

      const nextPageButton = new MessageButton()
        .setCustomId('next_page')
        .setLabel('Next ⟩')
        .setStyle('PRIMARY');
      buttons.push(nextPageButton);

      const lastButton = new MessageButton()
        .setCustomId('last_page')
        .setLabel('Last ⟩⟩')
        .setStyle('PRIMARY');
      buttons.push(lastButton);
    }

    // Send the first page of the inventory with buttons, if available
    const messageToSend = await message.channel.send({ embeds: [embedPages[pageIndex]], components: [new MessageActionRow().addComponents(buttons)] });

    // Create a collector to handle button interactions
    const filter = (interaction) => interaction.user.id === message.author.id && interaction.isButton();
    const collector = messageToSend.createMessageComponentCollector({ filter, time: 30000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'first_page') {
        pageIndex = 0;
      } else if (interaction.customId === 'previous_page') {
        pageIndex = Math.max(pageIndex - 1, 0);
      } else if (interaction.customId === 'next_page') {
        pageIndex = Math.min(pageIndex + 1, maxPageIndex);
      } else if (interaction.customId === 'last_page') {
        pageIndex = maxPageIndex;
      }

      // Update the message with the new page
      const updatedRow = new MessageActionRow().addComponents(buttons);
      embedPages[pageIndex].setFooter(`${message.author.username}'s inventory | pages: ${pageIndex + 1}/${embedPages.length}`,message.author.displayAvatarURL());
 
      await interaction.update({ embeds: [embedPages[pageIndex]], components: [updatedRow] });
    });

    collector.on('end', () => {
      const finalRow = new MessageActionRow().addComponents(buttons.map((button) => button.setDisabled(true)));
      messageToSend.edit({ components: [finalRow] });
    });
  },
};
