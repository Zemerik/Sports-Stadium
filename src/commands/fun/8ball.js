const { MessageEmbed } = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'Ask the 8-ball a question.',
  run: async (client, message, args) => {
    // Define possible answers
    const answers = [
      'It is certain.',
      'It is decidedly so.',
      'Without a doubt.',
      'Yes - definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      'Outlook good.',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Don\'t count on it.',
      'My reply is no.',
      'My sources say no.',
      "What!!are u serious!?!",
    "Wait what",
    "Shhh...it's a secret",
    "Ask me later im busy with your mom",
      'Outlook not so good.',
      'IMPOSSIBLE!!',
      'Very doubtful.'
    ];

    // Check if a question was provided
    const question = args.join(' ');
    if (!question) {
const no = new MessageEmbed ()
      .setTitle('Please ask a question.')
      .setColor("RED")

      return message.reply({embeds:[no]})
    }

    // Generate a random answer
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

    // Create and send the embed
    const embed = new MessageEmbed()
      .setColor('RANDOM')
   //   .setTitle('🎱 8-Ball')
      .addField('❓ Question', `• ${question}`)
      .addField('🔶 Answer', `• ${randomAnswer}`)
. setThumbnail (message.author.displayAvatarURL())

     // .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
