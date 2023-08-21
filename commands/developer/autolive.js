const Discord = require('discord.js');
const axios = require('axios');
const {reply}=require("../../config.json")
module.exports = {
  name: 'live',
  description: 'Fetches ongoing cricket match live scores',
  run: async (client, message, args) => {
    if(!message.author.id === "665181723276869655")return;
    try {
      const matchId = 'd0d196b9-5d51-4dad-bb1f-2861989d5387';

      const fetchScores = async () => {
        try {
          const response = await axios.get(
            'https://api.cricapi.com/v1/cricScore?apikey=2234ca2a-134a-4ad6-b535-7cc8c959907c'
          );
          const data = response.data.data;

          const match = data.find((m) => m.id === matchId);

          if (!match) {
            message.channel.send('```\nNo ongoing cricket match with the specified ID found.\n```');
            return;
          }

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
      //      .addField('Date & Time (GMT)', time)
            .addField('🔘 Status', `${reply} ${status}`)
            .addField('🏟️ Match', `${reply} ${team1} vs ${team2}`)
            .addField('🔢 Scores', `🔸 ${team1}: \`${t1s}\`\n🔹 ${team2}: \`${t2s}\``)
            .setAuthor('Ongoing Cricket Match Live Scores', thumbnail1)
            .setFooter(`Requested by ${message.author.username}`, thumbnail2)
            .setThumbnail(message.author.displayAvatarURL());

          const scoreMessage = await message.channel.send({ embeds: [embed] });

          // Recursive function to update scores every 3 seconds
          const updateScores = async () => {
            try {
              const updatedResponse = await axios.get(
                'https://api.cricapi.com/v1/cricScore?apikey=2234ca2a-134a-4ad6-b535-7cc8c959907c'
              );
              const updatedData = updatedResponse.data.data;

              const updatedMatch = updatedData.find((m) => m.id === matchId);

              if (!updatedMatch) {
                return;
              }

              const updatedT1s = updatedMatch.t1s || 0;
              const updatedT2s = updatedMatch.t2s || 0;

              // Edit the existing message with updated scores
              embed.fields = [
          //      { name: 'Date & Time (GMT)', value: time },
                { name: '🔘 Status',value: `${reply} ${status}`},
                { name: '🏟️ Match', value: `${reply} ${team1} vs ${team2}` },
                { name: '🔢 Scores', value: `🔸 ${team1}: \`${updatedT1s}\`\n🔹 ${team2}: \`${updatedT2s}\`` },
              ];

              scoreMessage.edit({ embeds: [embed] });

              // Recursive call after 3 seconds
              setTimeout(updateScores, 20000);
            } catch (error) {
              console.error('Error updating live scores:', error);
            }
          };

          // Start updating scores recursively
          setTimeout(updateScores, 20000);
        } catch (error) {
          console.error('Error fetching live scores:', error);
          message.channel.send('An error occurred while fetching the live scores.');
        }
      };

      // Fetch and display initial scores
      fetchScores();
    } catch (error) {
      console.error('Error initializing live scores:', error);
      message.channel.send('An error occurred while initializing the live scores.');
    }
  },
};
