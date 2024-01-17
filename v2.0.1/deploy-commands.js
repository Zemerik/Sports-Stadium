const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot_token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands/economy').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/economy/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(bot_token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();