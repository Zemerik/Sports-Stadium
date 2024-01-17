const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get bot latency"),
    async execute (interaction)  {
        return interaction.reply(`Pong! latency is ${interaction.client.ws.ping}ms`)
    }
}