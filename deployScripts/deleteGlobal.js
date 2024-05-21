const { REST, Routes } = require('discord.js');
const { logInfo, logError } = require('../util');

const commandId = process.argv[2];
if (!commandId) {
    logError('Usage: node deleteglobal.js <commandId>');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.delete(Routes.applicationCommand(process.env.BOT_ID, commandId))
    .then(() => logInfo('Successfully deleted application (/) command.'))
    .catch((error) => logError(error));
