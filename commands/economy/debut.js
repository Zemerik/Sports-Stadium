const Discord = require("discord.js");
const { Client,Util, Collection,Structures,CommandInteraction,ButtonInteraction,MessageButton,MessageEmbed,WebhookClient,MessageActionRow, MessageSelectMenu  , Modal, TextInputComponent} = require("discord.js");


module.exports = {
  name: "debut",
  description: "Starts your game",
  run: async(client, message, args) => {
      const embed = new MessageEmbed ()
      .setTitle("CONGRATULATIONS on making your debut.")
      .setDescription("You have been granted a squad of 11 players.\nYour team is:\n- Prithvi Shaw\n- Josh Phillipe\n- Haider Ali\n- Ollie Pope\n- Azam Khan\n- Daniel sams\n- Mitchell Bracewell\n- Ravi Bishnoi\n- Prasidh Krishna\n- Naseem Shah")
.setImage("https://cdn.discordapp.com/attachments/1019873595486392360/1130471580942729287/image.png")
      .setColor("YELLOW")
      message.channel.send({embeds:[embed]})
  }
}