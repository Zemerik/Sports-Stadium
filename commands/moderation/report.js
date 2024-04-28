const { MessageEmbed, MessageButton, MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
  name: 'report',
  description: 'Report an issue or provide information',
  run:async(client,message, args) =>{
    // Create the embed for the report button
    const embed = new MessageEmbed()
      .setColor('#ffff00') // Yellow color
      .setTitle('📑 Report')
      .setDescription('If you want to report an issue or provide information, click the button below and provide the details.');

    // Create the report button
    const reportButton = new MessageButton()
      .setStyle('DANGER')
      .setLabel('📑 Report')
      .setCustomId('report_button');

    // Create the action row with the report button
    const actionRow = new MessageActionRow().addComponents(reportButton);

    // Send the embed with the report button
    message.channel.send({ embeds: [embed], components: [actionRow] })
      
        // Create a collector to listen for button interactions
        const collector = message.channel.createMessageComponentCollector({ componentType: 'BUTTON', max: 1, time: 60000 });

        // Filter for user interactions only
        collector.filter = (interactio) => interactio.user.id === message.author.id;

        // Handle button interactions
        collector.on('collect', async(interactio) => {
          if (interactio.customId === 'report_button') {
            // Prompt the user for the report reason
            

         
            //modal

		const modal = new Modal()
			.setCustomId('report')
			.setTitle('Report Reason');


		const report = new TextInputComponent()
			.setCustomId('rep')
			.setLabel("Enter your Report Reason")
			.setStyle('PARAGRAPH');

	
		const action2 = new MessageActionRow().addComponents(report);

		modal.addComponents(action2);

    

	await	interactio.showModal(modal)

  }    
                               
  
      })  
          
          
        

        // Handle button interaction timeout
    /*    collector.on('end', (collected, reason) => {
          if (reason === 'time') {
            const timeoutEmbed = new MessageEmbed()
              .setColor('#ffff00') // Yellow color
              .setDescription('Report button interaction timed out.');

            message.channel.send({ embeds: [timeoutEmbed] });
          }
        });*/
      
                            }
                    }
