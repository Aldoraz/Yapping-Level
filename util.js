const clicolor = require('cli-color');
const { Client: PgClient } = require('pg');

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
        logError('Error executing query: ', error);
        throw error;
    }
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

const loggingLevels = {
    INFO: clicolor.blue('[INFO]'),
    WARN: clicolor.yellow('[WARN]'),
    ERROR: clicolor.red('[ERROR]'),
    DEBUG: clicolor.green('[DEBUG]')
};
const log = (level, message) => {
    const logMessage = `${getFormattedDateTime()} ${level} ${message}`;
    console.log(logMessage);
}
const logInfo = (message) => log(loggingLevels.INFO, message);
const logWarn = (message) => log(loggingLevels.WARN, message);
const logError = (message) => log(loggingLevels.ERROR, message);
const logDebug = (message) => log(loggingLevels.DEBUG, message);

module.exports = {
    logInfo,
    logWarn,
    logError,
    logDebug,
    executeQuery,
};