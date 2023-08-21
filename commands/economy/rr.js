const Discord = require("discord.js")
const express = require("express")
const client = new Discord.Client({
 intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES","GUILD_MEMBERS","GUILD_MESSAGE_REACTIONS"]
})
const db = require('quick.db');

module.exports = {
  run: async (client, message, args) => {
      if (message.content.includes("ssrr")) {
        const randomNumber = 1
        if (message.content.includes(randomNumber)) {
          const amount = 2000
          message.channel.send(`Correct!!\nYou have claimed ${amount} coins as your reward`)
          db.add(`coins_${author.id}`, amount);
        } else {
          message.channel.send(`**L BOZO**, the CORRECT number was ${randomNumber}`)
        }
      }
  }
}
