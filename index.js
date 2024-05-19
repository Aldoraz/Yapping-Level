const { Client, IntentsBitField, Events } = require("discord.js");
const { Client: PgClient } = require('pg');
const { logInfo, logWarn, logError, logDebug } = require('./util');
const { token } = require("./config.json");
require('dotenv').config();

const pgClient = new PgClient({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pgClient.connect()
    .then(() => logInfo("Connected to PostgreSQL."))
    .catch(err => logError("Error connecting to PostgreSQL: ", err.stack));

const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
);
const client = new Client({ intents: [botIntents] });

client.once(Events.ClientReady, async () => {
    logInfo(`${client.user.tag} successfully started.`); 
});

const yappingChannels = ["1241029518467141784"] // TODO: Make this configurable via command
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!yappingChannels.includes(message.channel.id)) return;

    const query = 'INSERT INTO messages(userId, serverId, channelId, timestamp) VALUES($1, $2, $3, $4)';
    const values = [message.author.id, message.guild.id, message.channel.id, new Date(message.createdTimestamp)];

    try {
        await pgClient.query(query, values);
        logInfo(`Message from ${message.author.tag} in ${message.guild.name}:${message.channel.name} logged.`) // TODO add logger and make more informative
    } catch (err) {
        logError("Error inserting message: ", err.stack);
    }
});

client.login(token);