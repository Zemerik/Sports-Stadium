const getYoutubeSubscriber = require('getyoutubesubscriber')
 

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const {reply}=require("../../config.json")
const axios = require("axios")
module.exports = {
  name: 'social',
  description: 'Displays social links.',
  run: async (client, message, args) => {


    //yt
    const server = client.guilds.cache.get('1019544819133054976');
    const serverMembers = server.memberCount;
   
    
getYoutubeSubscriber('UC7iKMklZu1tV4ymzl9ExU2w').then((data) => {

//dbl
const apiKey = process.env.dbl;

let upvoteCount = 0;

axios.defaults.headers.common['Authorization'] = apiKey;

  

setInterval(() => {
  axios.get('https://discordbotlist.com/api/servers/1019544819133054976')
    .then(response => {
      voteCount = response.data
      if (data.voters){
        upvoteCount = data.voters.length
      }
    }).catch(error => {
      console.error('An error occurred:', error);
    });
}, 600000); // fetch vote count every 10 minutes (600000 milliseconds)


   

              

 //   
    const embed = new MessageEmbed()
      .setColor('BLUE')
    //  .setTitle('Social Links')
      .setDescription('Check out our social links below:')
      .addField('🎮 Discord Server', `${reply} **[JOIN NOW](https://discord.gg/9atA4QQS3Q)\n${reply} Total Members: ${serverMembers}**`)
      .addField('▶️ YouTube Channel', `${reply} **[SUBSCRIBE NOW](https://www.youtube.com/@sportsstadium14/featured)\n${reply} Subscribers: ${data}**`)
      .addField('🗳️ vote on Top.gg', `${reply} **[VOTE FOR OUR SERVER](https://top.gg/servers/1019544819133054976/vote)\n${reply} Reward: 7000 coins \`📀\`**`)
      
      .addField('🎖 vote on DBL', `${reply} **[VOTE FOR OUR SERVER](https://discordbotlist.com/servers/sports-stadium-nitro-giveaway/upvote)**`)/*\n${reply} Upvotes: ${upvoteCount}**`)*/
      .setFooter('Thank you for your support!',message.author.displayAvatarURL() )
.setAuthor('Social Links',client.user.displayAvatarURL())   
//.setColor('YELLOW')
.setThumbnail(message.guild.iconURL({ dynamic: true }))
   // .setFooter({ text:`Requsted By ${message.author.username}`, iconURL: message.author.displayAvatarURL() })      
    
//.setTimestamp()  
 
  

    const discordButton = new MessageButton()
      .setLabel('🎮 Discord')
      .setStyle('LINK')
      .setURL('https://discord.gg/9atA4QQS3Q');

    const youtubeButton = new MessageButton()
      .setLabel('▶️ YouTube')
      .setStyle('LINK')
      .setURL('https://www.youtube.com/@sportsstadium14/featured');

    const voteButton = new MessageButton()
      .setLabel('🗳️ top.gg')
      .setStyle('LINK')
    .setURL('https://top.gg/servers/1019544819133054976/vote');

    
const dblButton = new MessageButton()
      .setLabel('🎖 DBL')
      .setStyle('LINK')
    .setURL('https://discordbotlist.com/servers/sports-stadium-nitro-giveaway/upvote')


  /*  const dblButton = new MessageButton ()
      .setLabel ('Discord Bot List')
      .setStyle('LINK')
      .setURL('https://discordbotlist.com/servers/sports-stadium-nitro-giveaway/upvote')*/
    const row = new MessageActionRow().addComponents(discordButton, youtubeButton, voteButton,dblButton);

    message.channel.send({ embeds: [embed], components: [row] });
      
      
  })


  },
};
        