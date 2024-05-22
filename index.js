const { Client, IntentsBitField, Events, Collection  } = require("discord.js");
const path = require('path');
const fs = require('fs');
const { logInfo, logError, executeQuery } = require('./util');


const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
);
const client = new Client({ intents: [botIntents] });

client.once(Events.ClientReady, async () => {
    logInfo(`${client.user.tag} successfully started.`);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        logError(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		logError(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		logError(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    let attachmentAmount = message?.attachments?.size + message?.embeds?.length;
    if (attachmentAmount === 0) attachmentAmount += (message.content.match(new RegExp("https://media.discordapp.net/attachments/", "g")) || []).length;
    
    const query = 'INSERT INTO messages(user_id, server_id, channel_id, created_at, attachment, attachment_amount) VALUES($1, $2, $3, $4, $5, $6)';
    const values = [message.author.id, message.guild.id, message.channel.id, new Date(message.createdTimestamp), attachmentAmount > 0, attachmentAmount];

    try {
        await executeQuery(query, values);
        logInfo(`Message from ${message.author.tag} in ${message.guild.name}/${message.channel.name} with ${attachmentAmount} attachment(s) logged.`);
    } catch (error) {
        logError('Error inserting message: ', error.stack);
    }
});

if (!process.env.BOT_TOKEN) {
    console.error("Missing BOT_TOKEN environment variable, unable to continue");
    process.exit(1)
}

client.login(process.env.BOT_TOKEN);