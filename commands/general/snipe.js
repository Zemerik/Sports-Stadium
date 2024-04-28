const {MessageEmbed} = require('discord.js')
const Discord = require ("discord.js")
module.exports = {
  name: "snipe",
  description: "Shows the latest deleted message",
  run: async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    let e = new MessageEmbed()
    .setTitle("Couldnt find latest deleted message")
    .setColor("RED")
    if(!msg) return message.channel.send({embeds:[e]})
const user = msg.author 
    const embed = new Discord.MessageEmbed()
   //  .setAuthor("Sniped Content",client.user.displayAvatarURL())
      .addField('🚹 Message Author:', `<@${msg.author}>`)
      .addField('💬 Sniped Message Content:', `\`\`\`\n${msg.content}\`\`\``)
     .setColor("RANDOM")
    // .setTimestamp()
 .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
. setThumbnail (client.user.displayAvatarURL({dynamic:true}))
    if(msg.image) embed.setImage(msg.image)
    message.channel.send( { embeds: [embed] } )
  }
} 
