const axios=require ('axios')
const { Client,Util, Collection,Structures,CommandInteraction,ButtonInteraction,MessageButton,MessageEmbed,WebhookClient,MessageActionRow, MessageSelectMenu  , Modal, TextInputComponent,MessageMentions,MessageAttachment} = require("discord.js");
const schedule = require('node-schedule');
const Topgg = require('@top-gg/sdk');
const moment = require('moment');

module.exports = (client,Discord) =>{
    client.on("interactionCreate",async(interaction) => {
  
if (interaction.customId === 'report') {
	

            const reportReason = interaction.fields.getTextInputValue('rep');
            //

              const reportEmbed = new MessageEmbed()
                .setColor('RED') // Yellow color
                //.setTitle('Report')
                .addField('Reported By', interaction.user.tag)
                .addField('Reason', reportReason)
  .addField("Guild Name", interaction.guild.name)
      .addField("Channel Name",  interaction.channel.name)
.addField("Channel Link", interaction.channel.toString())

              const yourDMChannelId = '1019873595486392360'; 
  const yourDMChannel = interaction.client.channels.cache.get(yourDMChannelId);
              yourDMChannel.send({ embeds: [reportEmbed] });
let user = await client.users.fetch("665181723276869655")
  user.send({ embeds: [reportEmbed] });


  
              // Provide feedback to the user
              const feedbackEmbed = new MessageEmbed()
                .setColor('GREEN') // Yellow color
                .setDescription('**Thank you for your report/information. It has been submitted.**');

              interaction.reply({ embeds: [feedbackEmbed] });

  }        

})
  
client.snipes = new Discord.Collection()
client.on("messageDelete", (message, channel) => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.id,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})
  
//for badwords system with em
// Import the functions from blacklist.js
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../blacklist.js");

//for chatcoins cchelppessage
 const coinCooldown = new Set();


const yourServerId = '1019544819133054976';
}