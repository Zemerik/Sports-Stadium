module.exports={
  name:"restart",
  run:async(client,message,args)=>{  
if (message.author.id !== "665181723276869655") return;
     message.channel.send('Restarting...')
      .then(() => client.destroy())
      .then(() => client.login(process.env.token)).then(() =>
message.channel.send("done"))
  }
}