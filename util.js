const clicolor = require('cli-color');

const loggingLevels = {
    INFO: clicolor.blue('[INFO]'),
    WARN: clicolor.yellow('[WARN]'),
    ERROR: clicolor.red('[ERROR]'),
    DEBUG: clicolor.green('[DEBUG]')
};

const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


const log = (level, message) => {
    const logMessage = `${getFormattedDateTime()} ${level} ${message}`;
    console.log(logMessage);
}

module.exports = {
    logInfo: (message) => log(loggingLevels.INFO, message),
    logWarn: (message) => log(loggingLevels.WARN, message),
    logError: (message) => log(loggingLevels.ERROR, message),
    logDebug: (message) => log(loggingLevels.DEBUG, message)
};