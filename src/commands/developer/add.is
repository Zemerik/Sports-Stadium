const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const {reply}=require("../../config.json")
module.exports = {
  name: 'additem',
  description: 'Add an item to the shop',
  run:async(client,message, args) =>{
const config = require("../../config.json")
    const allowedUserIds = config.allowedUserIds; 
if (!allowedUserIds.includes(message.author.id)) return;

  // if(!message.author.id === "665181723276869655") return;
    // Check if item name and price are provided
    if (args.length < 4) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setAuthor(`${message.author.username}, usage: (prefix)add [image link] [price] [tier] [name]`,message.author.displayAvatarURL())
        

      message.reply({ embeds: [embed] });
      return;
    }
const itemEmoji = args[0]
const itemPrice = parseInt(args[1]);
    const itemTier = parseInt(args[2]);
const itemName = args.slice(3).join(" ")
    
    
    

    // Check if item price is a valid number
    if (isNaN(itemPrice)) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setAuthor(`${message.author}, the item price must be a valid number.`,message.author.displayAvatarURL())
        

      message.reply({ embeds: [embed] });
      return;
    }
  if (isNaN(itemTier)) {
      const embed = new MessageEmbed()
        .setColor('#ffcc00')
        .setAuthor(`${message.author}, the item tier must be a valid number.`,message.author.displayAvatarURL())
        

      message.reply({ embeds: [embed] });
      return;
    }

    // Add the item to the shop
    const newItem = { emoji: itemEmoji, name: itemName, price: itemPrice, tier: itemTier };
    const shopItems = db.get('shop_items') || [];
    shopItems.push(newItem);
    db.set('shop_items', shopItems);
    
const itemIndex = shopItems.length - 1;

    const embed = new MessageEmbed()
      .setColor('#ffcc00')
      .setDescription(`☑️ Added`)
      .addField(`${itemEmoji} ${itemName}`,`${reply}${itemPrice} ${itemTier}`)
      .setThumbnail(message.author.displayAvatarURL())


    message.reply({ embeds: [embed] });
  },
};
