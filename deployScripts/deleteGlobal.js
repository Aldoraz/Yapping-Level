const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');
const { logInfo, logError } = require('../util');

const commandId = process.argv[2];
if (!commandId) {
    logError('Usage: node deleteglobal.js <commandId>');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

rest.delete(Routes.applicationCommand(clientId, commandId))
    .then(() => logInfo('Successfully deleted application (/) command.'))
    .catch((error) => logError(error));
