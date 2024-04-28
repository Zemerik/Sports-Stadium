const { MessageEmbed } = require("discord.js");
const db = require ("quick.db")

module.exports = {
  name: "spin",
  description: "spin the wheel and get coins",

  async run(client, message, args) {
    const lastWorked = db.get(`last_spin_${message.author.id}`);
    if (lastWorked) {
  

      const timeDiff = Date.now() - lastWorked;
      const minutesLeft = Math.floor((30 * 60 * 1000 - timeDiff) / 60000);
      if (minutesLeft > 0) {
       const o = new MessageEmbed ()
         .setAuthor(`You can spin again in ${minutesLeft} minutes!`,message.author.displayAvatarURL()).setColor("ORANGE")
        message.channel.send({embeds:[o]})
      return;
      }
    }

    try {
      const red =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451941403959358/Red.gif";
      const blue =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451954418888724/Blue.gif";
      const green =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451971514859520/Green.gif";
      const yellow =
        "https://cdn.discordapp.com/attachments/930931951005736990/1021451992310235218/Yellow.gif";

      var color1 = "🟥";
      var color2 = "🟦";
      var color3 = "🟩";
      var color4 = "🟨";

      const colors = [`${color1}`, `${color2}`, `${color3}`, `${color4}`];
      const endcolor = colors[Math.floor(Math.random() * colors.length)];

      var color = "";
      var Ecolor = "";
var coins = ""

      if (endcolor == color1) {
        color = red;
        Ecolor = "RED";
        coins = 700;
      }
      if (endcolor == color2) {
        color = blue;
        Ecolor = "BLUE";
        coins = 1450;
      }
      if (endcolor == color3) {
        color = green;
        Ecolor = "GREEN";
        coins = 3000;
      }
      if (endcolor == color4) {
        color = yellow;
        Ecolor = "YELLOW";
        coins = 2450;
      }
db.add(`coins_${message.author.id}`, coins)
      db.set(`last_spin_${message.author.id}`, Date.now());

      const embed = new MessageEmbed()
    //    .setTitle(`🎡Wheel of Coins🎡`)
     //   . setDescription (
   //       "**🟩 Green: 3000 coins📀\n🟥 Red: 700 coins📀\n🟨 Yellow: 2450 coins📀\n🟦 Blue: 1450 coins📀**"
     //   )
.addField("🟩 Green 3000 coins `📀`","**🟥 Red 700 coins `📀`**")
        .addField("🟨 Yellow 2450 coins `📀`","**🟦 Blue 1450 coins `📀`**")
        .setColor(`${Ecolor}`)
        . setThumbnail (`${color}`);

      message.channel.send({
        embeds: [embed],
      });
const final = new MessageEmbed ()
      . setAuthor (`The arrow landed on ${Ecolor} and got ${coins} 📀`,message.author.displayAvatarURL())
  .setColor(`${Ecolor}`) 
   setTimeout(() => message.reply({embeds:[final]}), 3000);

    } catch (err) {
      console.log(err);
    }
  },
};
