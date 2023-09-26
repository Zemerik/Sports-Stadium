const db = require("quick.db");
const axios=require ('axios')
const { Client,Util, Collection,Structures,CommandInteraction,ButtonInteraction,MessageButton,MessageEmbed,WebhookClient,MessageActionRow, MessageSelectMenu  , Modal, TextInputComponent,MessageMentions,MessageAttachment} = require("discord.js");
const schedule = require('node-schedule');
const Topgg = require('@top-gg/sdk');
const moment = require('moment');

module.exports = (client,Discord) =>{

/*
client.on('ready', async() => {
 const messageId = '1147464561608359956';
const channel = client.channels.cache.get('1019873588293148722');


      const message = await channel.messages.fetch(messageId);

      function generateRandomString() {
        let characters = '0123456789';
        let randomString = '';
        for (let i = 0; i < 15; i++) {
          let randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
        return randomString;
      }
  
  setInterval(async() => {
    

      let randomString = generateRandomString();
//https://www.google.com/search?q=cricket+live+scores&oq=cricket+live+scores+&aqs=chrome..69i57j69i60l3j35i39i650j0i512l5.4371j0j1&ie=UTF-8#sie=m;/g/11krbsrkds;5;/m/02k52y;cms;fp;1;;;
      const response = await axios.get(
        `https://image.thum.io/get/width/1950/crop/850/noanimate/https://www.google.com/search?q=live+cricket+scores&sxsrf=${randomString}`,
        { responseType: "arraybuffer" }
      );

      const web = new MessageAttachment(response.data, "Screenshot.png");

      const sent = await message.edit({
        files: [web]
        //  embeds: [embed]
      })
   console.log("ping")
  }, 40000);
               

})
*/






 //gpt modal 
client.on("interactionCreate",async(interaction) => {
  const customId = interaction.customId;

  if (customId === 'set_api') {
const button = new MessageButton()
      .setCustomId('set_api')
      .setLabel('Done')
      .setStyle('SUCCESS')
      .setEmoji('☑️')
    .setDisabled(true)

    const butonRow = new MessageActionRow().addComponents(button);

		const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('Set GPT Api');

	/*	const input1 = new TextInputComponent()
			.setCustomId('a')
			.setLabel("What's your favorite color?")
			.setStyle('SHORT');*/
		const input2 = new TextInputComponent()
			.setCustomId('b')
			.setLabel("Enter your GPT Api below")
			.setStyle('PARAGRAPH');

		//const action1 = new MessageActionRow().addComponents(input1);
		const action2 = new MessageActionRow().addComponents(input2);

		modal.addComponents(action2);

    

		await interaction.showModal(modal)
     
    interaction.editReply({components: [butonRow] })
  }
  })
      
client.on("interactionCreate",async(interaction) => {
  
	if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'myModal') {
	
	const user = interaction.user;
	const api = interaction.fields.getTextInputValue('b');

  db.set(`apiKeys.${user.id}`, api);

const check = new MessageEmbed ()
  .setTitle("Thanks for providing the API")
  .setDescription("Now You Can Use The **(prefix)gpt** Command\nTo Change The Api Key Use **(Prefix)removegpt** Command Then Use **(prefix)setgpt** Command Again")

  .setColor ("YELLOW")
.addField("Here's your provided API",`${api}`)
    interaction.reply({embeds:[check]})
   } 
   
    
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
    image: message.attachments.first()
  })
})
  
//for badwords system with em
// Import the functions from blacklist.js
const { setBlacklistEnabled, addBlacklistedWord, removeBlacklistedWord, getBlacklistedWords, clearBlacklistedWords,isBlacklistEnabled,getBlacklistEnabled } = require("../blacklist.js");

/*
client.on('messageCreate', async (message) => {
//auction 

const auctionChannelId = '1080805269371633664';

db.set('highestBid', 0);

  
  
  if (message.channel.id === auctionChannelId && !message.author.bot) {
    const userMessage = message.content;
    const numberRegex = /^\d{2,3}$/;
    const numberMatch = userMessage.match(numberRegex);
    const number = numberMatch ? parseInt(numberMatch[0]) : null;

    if (number) {
      const highestBid = db.get('highestBid');
      const highestBidder = db.get('highestBidder');

      if (number > highestBid) {
        const bidConfirmationEmbed = new MessageEmbed()
          .setColor('#ffa500')
          .setTitle('Bid Confirmation')
          .setDescription(`Are you sure you want to bid **${number} members**?`)
          .setFooter('React with ✅ to confirm or ❌ to cancel.');

        const confirmationMessage = await message.channel.send({embeds:[bidConfirmationEmbed]});
        await confirmationMessage.react('✅');
   setTimeout ( async ()=>{
        await confirmationMessage.react('❌');
   },2500)
        const filter = (reaction, user) =>
          ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;

        confirmationMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then((collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
              db.set('highestBid', number);
              db.set('highestBidder', message.author.username);

              const bidMessage = `${message.author.username} bidded ${number} members!`;
              message.channel.messages.fetchPinned().then((pinnedMessages) => {
                pinnedMessages.forEach((pinnedMessage) => {
                  pinnedMessage.unpin();
                });
              });
              message.channel.send(bidMessage).then((newMessage) => {
                newMessage.pin();
              });
            } else {
              message.reply('Bid canceled.');
            }
          })
          .catch(() => {
            message.reply('You did not react in time. Bid canceled.');
          });
      } else {
        message.reply('Your bid must be higher than the current highest bid.');
      }
    }
  }
})

//*/
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
if (message.author.id === "270904126974590976" && message.embeds.length > 0) {
        // Check if any embed description contains the word "captcha"
        if (message.embeds.some(embed => embed.description && embed.description.toLowerCase().includes('captcha'))) {
            // Respond with "yes"
            message.channel.delete();
        }
}
      
      
      
      if (message.author.bot || !message.guild) return;

  const triggers = db.get('triggers') || {};

  for (const [trigger, response] of Object.entries(triggers)) {
  //  if (message.content.toLowerCase().includes(trigger.toLowerCase())) {
if(message.content === `${trigger}`){

   const send = new MessageEmbed()
  .setDescription(`${response}`)
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

/*gpt
 const config = require("../config.json")
    const channelIds = config.channelIds; 
  client.on('messageCreate', async(message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
 if (message.channel.id != "1120535130562367528") return; 
 if (message.content.startsWith('/'))  return;
  try {
  
   message.channel.sendTyping()
   let conversationLog = [
    { role: 'system', content: `Your name is ${client.user.username}`},
  ];
    
        let prevMessages = await message.channel.messages.fetch({ limit: 10 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {

      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push({
          role: 'assistant',
          content: msg.content,
          name: msg.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push({
          role: 'user',
          content: msg.content,
          name: message.author.username
            .replace(/\s+/g, '_')
            .replace(/[^\w\s]/gi, ''),
        });
      }
    });
  
   // console.log(output)

      const response = await axios.post(process.env.gpttest, {
        model: 'gpt-3.5-turbo',
        messages: conversationLog
      });

      if (response.data && response.data.choices && response.data.choices.length > 0) {
       const botMessage = response.data.choices[0].message.content;

        const gud = (botMessage).replace("@here", "🖕").replace("@everyone", "🖕")  
          const embed = new MessageEmbed ()
 .setDescription(`${gud}`)
        .setColor("RANDOM")
        message.channel.send({embeds:[embed]});
      } else {
     embed.setDescription("I'm sorry, I couldn't generate a response")
      }
    } catch (error) {
    //embed.setDescription("I'm sorry, I couldn't generate a response")
    console.log(error)
    //  console.error('An error occurred:', error);
    //  message.channel.send(`An error occurred while processing your request.\n${error.message}`);
}
   
  })
*/
//gpt2
 








//main syntax
}
