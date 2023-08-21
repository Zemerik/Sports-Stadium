const {MessageEmbed} = require ("discord.js")
const db =require("quick.db")

module.exports = {
        name: "balance",
        description: "check ur balance",
        aliases: ["bal","coins"],
  category:"economy",
        
        run:async(client, message, args) => {

 let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`coins_${user.id}`);

    if (bal === null) bal = 0;

    let trophies = await db.fetch(`trophies_${user.id}`);

    if (trophies === null) trophies = 0;
    //let Total = bal + bank;
    
    if (user) {
   
          
 const money = new MessageEmbed()  
     .setTitle(`${user.user.username}'s Balances`)    
    //.setDescription(`**📀 Coins: ${bal}\n🏆 Trophies: ${trophies}**`)
  .setColor('YELLOW')
   .addField(`📀 Coins: ${bal}`,`**🏆 Trophies: ${trophies}**`)
.setFooter("🏏")
.setTimestamp()  
   .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))   

message.channel.send({embeds:[money]})
  } else {
      return message.reply("**Mention A Valid User!**");
    }
  }
};

