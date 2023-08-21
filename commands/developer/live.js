const { MessageAttachment } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "live",
  
  description: "Get live cricket score card",

  run: async (client, message, args) => {
function generateRandomString() {
  let characters = '0123456789';
  let randomString = '';
  for (let i = 0; i < 15; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

let randomString = generateRandomString();
    
    const user = message.author.tag;
  /*  const urls = args[0];

   if (!urls)
     return message.channel.send(`\`\`\`\n${user}, please provide a link.\n\`\`\``);

    if (urls.length < 8)
      return message
        .reply("<> https is too short to reach - 8 limit")
        .then((m) => m.delete({ timeout: 9000 }).catch((e) => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;*/
    
  //  try {
      const response = await axios.get(
        `https://image.thum.io/get/width/1950/crop/850/noanimate/https://www.google.com/search?q=live+cricket+scores&sxsrf=${randomString}`,
        { responseType: "arraybuffer" }
      );

      const web = new MessageAttachment(response.data, "Screenshot.png");

     const sent = await message.channel.send({
        files: [web]/*,
        content: `\`\`\`\nHere is a screenshot from the requested URL\n\`\`\``*/
          })
 //   sent.delete()    
    
   //   return sent;
 /*   } catch (err) {
      if (err.response && err.response.status === 404) {
        return message.channel.send("Could not find any results. Invalid URL?")
          .then((m) => m.delete({ timeout: 14000 }).catch((e) => {}));
      } else {
        return message.reply(
          `Oh no, an error occurred: \`${err.message}\`. Please try again later!`
        );
      }
    }*/
  },
}; 

