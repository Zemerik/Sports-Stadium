const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../../utils/schemas")

module.exports = {
    cooldown: 86400,
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get your daily money"),
    async execute (interaction) {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: "YELLOW" })

        userData.wallet += 50
        userData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`💰 You have collected your daily \` 50 🪙 \` amount`),
                      embed.setFooter('Note: Your current balance will be changed to your previous balance soon')
                    ]
        })
        
    }
}