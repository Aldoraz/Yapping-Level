const { Client, IntentsBitField, Events } = require("discord.js");
const { Client: PgClient } = require('pg');
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
  .then(() => console.log(`[${new Date().toLocaleTimeString()}] Connected to PostgreSQL`)) // TODO add logger
  .catch(err => console.error(`[${new Date().toLocaleTimeString()}] Connection error`, err.stack));

const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
);
const client = new Client({ intents: [botIntents] });

client.once(Events.ClientReady, async () => {
    console.log(`[${new Date().toLocaleTimeString()}] ${client.user.tag} is up and running!`); // TODO use logger
});

const yappingChannels = ["1241029518467141784"] // TODO: Make this configurable via command
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!yappingChannels.includes(message.channel.id)) return;

    const query = 'INSERT INTO messages(userId, serverId, channelId, timestamp) VALUES($1, $2, $3, $4)';
    const values = [message.author.id, message.guild.id, message.channel.id, new Date(message.createdTimestamp)];

    try {
        await pgClient.query(query, values);
        console.log(`[${new Date().toLocaleTimeString()}] Message logged to database`); // TODO add logger and make more informative
    } catch (err) {
        console.error(`[${new Date().toLocaleTimeString()}] Error inserting message`, err.stack);
    }});

client.login(token);