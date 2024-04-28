const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../../utils/schemas")

const jobs = [
    "6️⃣ Six",
    "4️⃣ Four",
    "💔 Wicket",
    "🤪 Hatrick",
]


module.exports = {
    cooldown: 3600,
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to earn money"),
    async execute (interaction)  {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const amount = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        const job = jobs[Math.floor(Math.random() * jobs.length)]

        userData.wallet += amount
        userData.cooldowns.work = Date.now() + (1000 * 60 * 60)
        userData.save()

        const workEmbed = new MessageEmbed()
            .setDescription(`You scored a **\` ${job} \`** and earned \` ${amount} 🪙 \``)
            .setColor("YELLOW")
            .setFooter('Note: Your current balance will be changed to your previous balance soon')

        try {
            await interaction.reply( { embeds : [ workEmbed ] } )
        } catch (error) {
            console.log(error)
        }

    }
}
