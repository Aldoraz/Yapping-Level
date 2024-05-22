const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const { logInfo, logError } = require('../util');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
}

(async () => {
    try {
        logInfo(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID, process.env.BOT_SERVER),
			{ body: commands },
		);

        logInfo(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        logError(error);
    }
    process.exit();
})();