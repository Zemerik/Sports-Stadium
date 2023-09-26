const { MessageActionRow, Modal, TextInputComponent,MessageEmbed,MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'setapi',
  description: 'Set your GPT API key',
  run:async(client,message, args) =>{
    //if(!message.author.id === "665181723276869655") return message.reply("U can't use it for now");
    message.react("👍")
      const user = message.author;
      

      // Check if API key is already set for the user
      const api = db.get(`apiKeys.${user.id}`);
      if (api) {
        const no = new MessageEmbed ()
        .setTitle("Your GPT API key is already set")
        .setDescription (`${api}`)
        .setColor ("GREEN")
        await user.send({embeds:[no]});
        return;
      }

      // Send a message to instruct the user to set the API key
      const button = new MessageButton()
      .setCustomId('set_api')
      .setLabel('Set Api')
      .setStyle('SUCCESS')
      .setEmoji('☑️')
    .setDisabled(false)
    

    const buttonRow = new MessageActionRow().addComponents(button);
const done = new MessageEmbed()
  .setTitle("Click Below Button To Set Your GPT Api")
. setColor ("GREEN")
const dm = new MessageEmbed ()
    . setDescription(`Please check your DMs. If you didn't receive it, please make sure that Direct Messages are enabled for this server. Here's how to enable Direct Messages:\n\n1. Click on the server name to open the server settings menu.\n\n2. Select "Privacy Settings".\n\n3. Under the "Direct Messages" section, make sure that the "Allow direct messages from server members" option is turned on.\n\n4. If this option is not turned on, click on the toggle switch to enable it.\n\nOnce you have enabled Direct Messages for the server, you should be able to receive messages from other members.`)
    .setColor ("YELLOW")
    message.reply({embeds:[dm]}).then(msg => {
    // Automatically delete the warning message after 5000 milliseconds (5 seconds)
    setTimeout(() => {
      msg.delete();
    }, 10000);
    })
    

    await user.send({ embeds: [done], components: [buttonRow] });


      // Set up a message collector to listen for the API key input


        
        

        

      
    
  }
}
