const { REST, Routes } = require('discord.js');
const { clientId, devServerId, token } = require('../config.json');
const { logInfo, logError } = require('../util');

const commandId = process.argv[2];
if (!commandId) {
    logError('Usage: node deleteglobal.js <commandId>');
    process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

rest.delete(Routes.applicationGuildCommand(clientId, devServerId, commandId))
    .then(() => logInfo('Successfully deleted guild (/) command.'))
    .catch(error => logError(error));
