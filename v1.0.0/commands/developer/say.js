module.exports ={
run:async(client,message, args) =>{
const arg = args.join(" ")
  message.channel.send(`${arg}`)


}
}