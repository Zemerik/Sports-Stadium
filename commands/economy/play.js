const express = require("express")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require("discord.js")
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES","GUILD_MEMBERS","GUILD_MESSAGE_REACTIONS"]})

module.exports = {
  run:async(client, message, args) => {
    if (message.content === "ssplay") {
    const embed = new MessageEmbed ()
    .setTitle("Game")
    .setColor("BLUE")
    .setDescription("play the game")
    const button1 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("A")
    .setLabel("DRIVE")
    const button2 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("B")
    .setLabel("Sweep")
    const button3 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("C")
    .setLabel("Scoop")
    const button4 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("D")
    .setLabel("Cut")
    const button6 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("E")
    .setLabel("Loft")
    const button7 = new MessageButton ()
    .setStyle("PRIMARY")
    .setCustomId("F")
    .setLabel("Defend")
    const score = 0
    const options = [1, 2, 3, 4, 6, 7]
    const randomIndex = Math.floor(Math.random() * options.length);
    client.on('interactionCreate', async (interaction) => {
      if (interaction.customId === 'A') {
          message.channel.send(`You scored ${randomIndex} runs`)
        if (randomIndex > 6) {
        message.channel.send("OUT")
        } else if (randomIndex < 6) {
          message.channel.send(`You scored ${randomIndex} runs`)
          const newScore = score + randomIndex
          const embed = new MessageEmbed ()
          .setTitle(`${randomIndex}`)
          .setColor("BLUE")
          .setDescription(`${newScore} runs`)
          message.channel.send({embeds:[embed]})
        }
        interaction.component.setDisabled(true);
    interaction.update({ components: [interaction.component] });
      if (interaction.customId === 'B') {
        message.channel.send(`You scored ${randomIndex} runs`)
        interaction.component.setDisabled(true);
      interaction.update({ components: [interaction.components] })
      }
      if (interaction.customId === 'C') {
        message.channel.send(`You scored ${randomIndex} runs`)
        interaction.component.setDisabled(true);
      interaction.update({ components: [interaction.components] })
      }
      if (interaction.customId === 'D') {
        message.channel.send(`You scored ${randomIndex} runs`)
        interaction.component.setDisabled(true);
      interaction.update({ components: [interaction.components] })
      }
      if (interaction.customId === 'E') {
        message.channel.send(`You scored ${randomIndex} runs`)
        interaction.component.setDisabled(true);
      interaction.update({ components: [interaction.components] })
      }
        if (randomIndex > 6) {
        message.channel.send("OUT")
        }
        else if (randomIndex < 6) {
          message.channel.send(`You scored ${randomIndex} runs`)
          const newScore = score + randomIndex
          const embed = new MessageEmbed ()
          .setTitle(`${randomIndex}`)
          .setColor("BLUE")
          .setDescription(`${newScore} runs`)
          message.channel.send({embeds:[embed]})
        }
    }
    })
    const hello = new MessageActionRow().addComponents(button1, button2, button3, button4);
    const hi = new MessageActionRow().addComponents(button6, button7);
    message.channel.send({embeds:[embed], components:[hello, hi]})
  }
  }
  }

