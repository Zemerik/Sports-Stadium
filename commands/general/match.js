const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  name:  "match", 
  description: 'Fetches ongoing cricket match live scores',
 run: async(client, message, args)=> {
    try {
      const response = await axios.get('https://api.cricapi.com/v1/cricScore?apikey=2234ca2a-134a-4ad6-b535-7cc8c959907c');
   const data = response.data.data;


     // console.log('API Response:', data nn);

            if (data.length === 0) {
        message.channel.send('```\nNo ongoing cricket matches found.\n```');
        return;
      }

      const match = data[0];
      const time = match.dateTimeGMT;
      const t1s = match.t1s || 0;
      const t2s = match.t2s || 0;
      const team1 = match.t1;
      const team2 = match.t2;
      const status = match.status; 
      const thumbnail1 = match.t1img;
      const thumbnail2 = match.t2img;

      const embed = new Discord.MessageEmbed()
        .setColor('YELLOW')
       // .setTitle('Ongoing Cricket Match Live Scores')
        .addField('Date & Time(GMT)', `${time}`)
       .addField('Status', `${status}`)
        .addField('Match', `${team1} vs ${team2}`)
        .addField('Scores', `${team1}:${t1s}\n${team2}:${t2s}`)
     .setAuthor({ name:`Ongoing Cricket Match Live Scores`, iconURL:thumbnail1})   
   .setFooter({text:`Requested by ${message.author.username}`,iconURL:thumbnail2})   .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
        

      message.channel.send({embeds:[embed]});
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the live scores.');
    }
  }
};
