const clicolor = require('cli-color');
const { Client: PgClient } = require('pg');
const fs = require('fs');

const pgClient = new PgClient({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pgClient.connect()
    .then(() => logInfo("Connected to PostgreSQL."))
    .catch(err => logError("Error connecting to PostgreSQL: ", err.stack));

const executeQuery = async (query, values = []) => {
    try {
        return result = await pgClient.query(query, values);
    } catch (error) {
        logError('Error executing query: ', error.message);
        throw error;
    }
};

const loggingLevels = {
    INFO: clicolor.blue('[INFO]'),
    WARN: clicolor.yellow('[WARN]'),
    ERROR: clicolor.red('[ERROR]'),
    DEBUG: clicolor.green('[DEBUG]')
};
const log = (level, message, obj) => {
    let logMessage = `${getFormattedDateTime()} ${level} ${message}`;

    console.log(logMessage);
    if (obj) console.log(obj);

    logMessage = stripAnsi(logMessage);
    fs.appendFile('yapper.log', logMessage + '\n', (err) => {
        if (err) {
            logError('Error writing to log file:', err);
        }
    });

    if (obj) {
        fs.appendFile('yapper.log', JSON.stringify(obj, null, 2) + '\n', (err) => {
            if (err) {
                logError('Error writing object to log file:', err);
            }
        });
    }
}

const logInfo = (message, obj) => log(loggingLevels.INFO, message, obj);
const logWarn = (message, obj) => log(loggingLevels.WARN, message, obj);
const logError = (message, obj) => log(loggingLevels.ERROR, message, obj);
const logDebug = (message, obj) => log(loggingLevels.DEBUG, message, obj);

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

function stripAnsi(str) {
    return str.replace(/\u001b\[[0-9;]*m/g, '');
};

module.exports = {
    logInfo,
    logWarn,
    logError,
    logDebug,
    executeQuery,
};