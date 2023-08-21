const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const Topgg = require('@top-gg/sdk');
const {reply}=require("../../config.json")
module.exports = {
  name: 'vote',
  run: async (client, message, args) => {
    const member = message.member;
    const topgg = new Topgg.Api(process.env.top);
    const voted = await topgg.hasVoted(member.user.id);

    if (!voted) {
      const noVoteEmbed = new MessageEmbed()
        .setColor('YELLOW')
       // .setTitle('Vote')
        . setTitle (`>>> You have not voted yet. Click the button below to vote for the bot`)
        . setDescription (`**\`📀\` Reward: 7000 coins**`,message.author.displayAvatarURL())
        .setFooter('Thank you for supporting our bot!');

      const voteButton = new MessageButton()
        .setStyle('LINK')
        .setLabel('Vote Here')
        .setURL('https://top.gg/bot/1119542429201211432/vote');

      const row = new MessageActionRow().addComponents(voteButton);

      return message.channel.send({ embeds: [noVoteEmbed], components: [row] });
    } else if (voted) {
      const alreadyVotedEmbed = new MessageEmbed()
        .setColor('YELLOW')
     //   .setTitle('Vote')
        .setTitle('>>> You have already voted. Thank you for your support!')
        .setFooter('Your vote is greatly appreciated.');

      return message.channel.send({ embeds: [alreadyVotedEmbed] });
    }
  }
};
