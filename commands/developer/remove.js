const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'removeitem',
  description: 'Remove an item from the shop',
  run:async(client,message, args) =>{
  // if(!message.author.id === "665181723276869655") return; 
const config = require("../../config.json")
    const allowedUserIds = config.allowedUserIds; 
if (!allowedUserIds.includes(message.author.id)) return;

    // Check if item index is provided
    if (args.length === 0) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setDescription(`**please provide the index of the item you want to remove.**`)
        

      message.reply({ embeds: [embed] });
      return;
    }

    const itemIndex = parseInt(args[0]);

    // Check if item index is a valid number
    if (isNaN(itemIndex)) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setDescription(`**The item index must be a valid number**`)
        
      message.channel.send({ embeds: [embed] });
      return;
    }

    // Retrieve the shop items from the database
    const shopItems = db.get('shop_items') || [];

    // Check if the item index is out of bounds
    if (itemIndex < 0 || itemIndex >= shopItems.length) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setDescription(`**Invalid item index. Please provide a valid index**`)
        

      message.reply({ embeds: [embed] });
      return;
    }

    // Remove the item from the shop
    const removedItem = shopItems.splice(itemIndex, 1)[0];
    db.set('shop_items', shopItems);

    const embed = new MessageEmbed()
      .setColor('#ffcc00')
      .setDescription(`**☑️ Removed\n\n${removedItem.name}**`)
      
      

    message.reply({ embeds: [embed] });
  },
};
