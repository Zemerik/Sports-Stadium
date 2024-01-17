const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../../utils/schemas")

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Beg stranger for money"),
    async execute (interaction)  {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: "YELLOW" })

        const amount = Math.floor((Math.round(10 / (Math.random() * 10 + 1)) * 10) / 2)

        if (amount <= 5) {
            return interaction.reply({
                embeds: [embed.setDescription("🥺 You got nothing this time, maybe try hard next time?")],
            })
        }

        userData.wallet += amount
        userData.save()

        return interaction.reply({
            embeds: [
                embed.setDescription(`Oh my! You begged and earned \` ${amount} 🪙 \``),
                embed.setFooter('Note: Your current balance will be changed to your previous balance soon')
            ]
        })
    }
}