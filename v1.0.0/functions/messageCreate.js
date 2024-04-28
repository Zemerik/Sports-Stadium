 
const db = require("quick.db");
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
//////
  
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

client.on("messageCreate",async(message)=>{




  
  if (message.author.bot) return;
  if (!message.guild) return;


  const blacklistEnabledd = getBlacklistEnabled(message.guild)
  if (!blacklistEnabledd) return;
  const blacklistedWords = getBlacklistedWords(message.guild)
  if (blacklistedWords.length > 0) {
    const content = message.content.toLowerCase();
    for (const word of blacklistedWords) {
      if (content.includes(word.toLowerCase())) {
        
        message.delete();
        
        const embed = new Discord.MessageEmbed()
          .setTitle('Blacklisted Word Detected')
          .setDescription(`Your message contained the blacklisted word. Please refrain from using that word in the future.`)
         .setColor('YELLOW')
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true })
          )   

          
        message.channel.send({ embeds: [embed] }).then(msg => {
    
    setTimeout(() => {
      msg.delete();
    }, 7000);
  }); 

        
      }
    }
  }
})

//for chatcoins cchelppessage
 const coinCooldown = new Set();


const yourServerId = '1019544819133054976';

client.on('messageCreate', async (message) => {
  if (message.guild?.id !== yourServerId) return;
  if (message.author.bot) return;

  const userId = message.author.id;
  const coins = db.get(`coins_${userId}`) || 0;
const chatCoins = db.get(`chatcoins_${userId}`) || 0;
  if (coinCooldown.has(userId)) return;

  const coinAmount = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  db.add(`coins_${userId}`, coinAmount);
db.add(`chatcoins_${userId}`, coinAmount)
  coinCooldown.add(userId);

  setTimeout(() => {
    coinCooldown.delete(userId);
  }, 300000);
const channelId = "1119987393152430101"
const chan = client.channels.cache.get(channelId)
      const tagg = await client.users.fetch(userId)
const userTag = tagg.tag
const em = new MessageEmbed ()
  .setDescription(`**${userTag} earned ${coinAmount} coins by chatting**`) 
  .setColor("RANDOM")

chan.send({embeds:[em]})
  

}); 

//trigger system 
    client.on('messageCreate', async (message) => {
      
      
      
      if (message.author.bot || !message.guild) return;

  const triggers = db.get('triggers') || {};

  for (const [trigger, response] of Object.entries(triggers)) {
  //  if (message.content.toLowerCase().includes(trigger.toLowerCase())) {
if(message.content === `${trigger}`){

   const send = new MessageEmbed()
  .setDescription(`**${response}**`)
  .setColor("RANDOM") 
message.channel.send({embeds:[send]});
      break;
    }
  }
      })

//chatbot 
client.on('messageCreate', async(message) => {
  const chatbotChannelId = db.get(`chatbotChannel_${message.guild.id}`);
  if (!message.guild) return;
  if (message.author.bot) return;
  
 if (message.channel.id != chatbotChannelId) return; 
        if (message.content.startsWith('/'))  return;
  
  try {
    message.channel.sendTyping()
     //  let res = await axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(message.content)}`);
  let res = await axios.get(`http://api.brainshop.ai/get?bid=163720&key=wN0HGDiinarW8Rle&uid=${message.author.id}&msg=${message.content.toLowerCase()}`)
   const goo = res.data.cnt;
    const gooo = (goo).replace('Elpha', 'Sports Stadium').replace("Pranshu05#4726", '⟩ ᎬSROR ツ#4065').replace('You ( ͡° ͜ʖ ͡°)', 'Your mom ( ͡° ͜ʖ ͡°)')  
const csend = new MessageEmbed ()
    .setDescription(`**${gooo}**`) 
  
    .setColor("WHITE")
if(message.content.includes("are you gay") || message.content.includes("you are gay") || message.content.includes("are u gay") || message.content.includes("u are gay")){
  csend.setDescription(`**No but you are ( ͡° ͜ʖ ͡°)**`)
message.reply({embeds:[csend]});
} else {
    message.reply({embeds:[csend]});
}

  } catch(error) {
    const serr = new MessageEmbed ()
    .setTitle(`Bot Down, please try again later...\n\n${error.message}`)
. setColor ("RED")

    message.channel.send({embeds:[serr]})
}

    
  
  }) 










//main syntax
}