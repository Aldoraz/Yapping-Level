const { REST, Routes } = require('discord.js');
const { logInfo, logError } = require('../util');

const commandId = process.argv[2];
if (!commandId) {
    logError('Usage: node deleteglobal.js <commandId>');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.delete(Routes.applicationGuildCommand(process.env.BOT_ID, process.env.BOT_SERVER, commandId))
    .then(() => logInfo('Successfully deleted guild (/) command.'))
    .catch(error => logError(error));
