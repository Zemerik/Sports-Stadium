const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../../utils/schemas")

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your or another user's balance")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose balance you want to check")
    ),
    async execute (interaction)  {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const balanceEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s balance`)
        .setDescription("Note: Your current balance will be changed to your previous balance soon")
        .setColor("YELLOW")
        .setThumbnail(user.displayAvatarURL())
        .addField("• Wallet", `**\` ${userData.wallet} 🪙 \`**`, true)
        .addField("• Bank", `**\` ${userData.bank} 🪙 \`**`, true)
        
        await interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}