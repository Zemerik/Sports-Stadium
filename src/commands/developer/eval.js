const discord =require ("discord.js")
const { MessageEmbed } = require("discord.js");
const db = require ("quick.db")
module.exports = {
	name: "eval",
	category: "Dev only",
	devOnly: true,
	description: "Evaluate a JavaScript code.",
aliases:["evaluate"],

	disabledChannel: [],
	/**
	 *
	 * @param {CommandStructure}
	 * @returns {Promise<*>}
	 */
	run: async (client, message, args) => {
		

		if (message.author.id !== "665181723276869655") return;

		const clean = async text => {
			if (typeof text === "string")
				return (
					text
						 .replace(/`/g, "`" + String.fromCharCode(8203))
						.replace(/@/g, "@" + String.fromCharCode(8203))
						.replace(/token/g, "[Something Important]")
				);
			else return text;
		};
		let code = args.join(" ");
		if (!code) {
			return message.channel.send("You forgot your code, dummy");
		}
		// The code might begin in code blocks that is ``` and there might be a extra "js" annotation saying it's a javascript code.
		// Create a regex to replace the ``` if the code starts and ends with it along with the js if it is available at the starting after codeblock
		code = code.replace(/```js/g, "");
		code = code.replace(/```/g, "");
		code = code.replace(/token/g, "[Something Important]");

		try {
			let evalCode = code.includes(`await`) ? `;(async () => { ${code} })()` : code;

			client.channels.cache.get("1118564259748659200").send({
				embeds: [
					new MessageEmbed()
						.setTitle("New Eval!")
						.addFields({ name: "Executor", value: `${message.author.tag} | ${message.author.id} | <@!${message.author.id}>` })
						.addFields({ name: "Input", value: `\`\`\`js\n${code}\n\`\`\`` }),
				],
			});
			let evaled = await clean(eval(evalCode));
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

			let output;
			if (evaled !== undefined) {
				output = `\`\`\`js\n` + evaled + `\n\`\`\``;
			} else {
				output = `\`\`\`fix\nNo Output To Show.\n\`\`\``;
			}
			output = output.length > 1024 ? "```fix\nLarge Output\n```" : output;
			// So, we'll have to filter the output of client.token variable in the output, search for it, and replace it with [Something important]
			output = output.replace(new RegExp(client.token, "g"), "[Something Important]");
			const embed = new MessageEmbed()
				.setAuthor({ name: "Eval", iconURL: message.author.avatarURL() })
				.addFields({ name: "Input", value: `\`\`\`js\n${code}\n\`\`\`` })
		.addFields({ name: "Output", value: output })
				.setColor("#00ffee")
				.setTimestamp();
      const ch = client.channels.cache.get("1118564259748659200")
			ch.send({ embeds: [embed] });
		} catch (err) {
			const errorEmb = new MessageEmbed()
				.setAuthor({ name: "Eval", iconURL: message.author.avatarURL() })
				.setColor(`#ff0000`)
			.addFields({ name: "Input", value: `\`\`\`js\n${code}\n\`\`\`` })
			.addFields({ name: "Error", value: `\`\`\`js\n${err}\n\`\`\`` });
      const ch = client.channels.cache.get("1118564259748659200")
			ch.send({ embeds: [errorEmb] });
		}
	},
};