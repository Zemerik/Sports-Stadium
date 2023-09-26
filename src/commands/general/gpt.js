const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

const { OpenAIApi, Configuration } = require("openai")

module.exports = {
  name: 'gpt',
  description: 'Generate a response using GPT-3.5 Turbo',
  run:async(client,message, args) =>{
    const user = message.author;

    // Check if API key is set for the user
    const apiKey = db.get(`apiKeys.${user.id}`);
    if (!apiKey) {
      

const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel('❔ How Get API Key?')
      .setStyle('PRIMARY')
      .setCustomId('getapi')
  );
      //
      const embed = new MessageEmbed()
        .setColor('#FFFF00') // Set the embed color to yellow
        .setDescription(`Please set your OPENAI API key first.`);
const how = new MessageEmbed ()
      .setDescription (`**To get started with the OpenAI API, you\'ll need to go to the [OpenAI API Keys](https://platform.openai.com/account/api-keys) page and follow these steps:\n\n1. If you don\'t have an OpenAI account, create one by going to the [OpenAI website](https://openai.com/) and clicking on "Get Started".\n2. Once logged in, click on your profile picture in the top right corner and then click on "API Keys".\n3. Click on the "New API Key" button.\n4. Give your API key a name and select the permissions that you want to grant it.\n5. Click on the "Create API Key" button.\n6. Copy your API key and use (prefix)setgpt Command\n[use (prefix)removegpt to remove the api key]**`)
      .setColor("RANDOM")
          
      const em = await message.reply({ embeds: [embed], components:[row] });
  const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = em.createMessageComponentCollector({
      filter,
      time: 30000, // 30 seconds
    });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'getapi') {           
await interaction.update({ embeds: [how], components: [] });
  }
    })

      return;

    }

if (!args.length) {
      return message.reply('```\nPlease provide a query.\n```');
}
    
const gptApiKey = apiKey;
const configuration = new Configuration({
  apiKey: apiKey,
});
    const openai = new OpenAIApi(configuration);
    // Fetch the user's GPT API key from the database
    

    // Create a conversation log array with user and bot messages
    const conversationLog = [
      { role: 'system', content: `${user.tag} asked:` },
      { role: 'user', content: args.join(' ') },
      { role: 'assistant', content: '' },
    ];

    try {
      // Generate a response using OpenAI GPT-3.5 Turbo
      const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        
      });

      // Extract the generated response from the result
      const response = result.data.choices[0].message;
const cod2 = JSON.stringify(response).replace('{"role":"assistant","content":"', '').replace('"}', '').replace(/\\n/g, '\n')
      // Send the generated response as an embed message
      const embed = new MessageEmbed()
        .setColor('RANDOM') // Set the embed color to yellow
        .setDescription(`${cod2}`);

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const embed = new MessageEmbed()
        .setColor('#FF0000') // Set the embed color to red
        .setDescription(`**${error.message}**`)

      message.reply({ embeds: [embed] });
    }
  

    }
        }