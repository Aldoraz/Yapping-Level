const { Client, IntentsBitField, Events } = require("discord.js");
const { token } = require("./config.json");

const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
);
const client = new Client({ intents: [botIntents] });

client.once(Events.ClientReady, async () => {
    console.log(`[${new Date().toLocaleTimeString()}] ${client.user.tag} is up and running!`);
});

client.login(token);