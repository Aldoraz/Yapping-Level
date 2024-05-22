const { logInfo, logError, logDebug, executeQuery } = require('../util');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Database based commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('command')
                .setDescription('Run a command on the database')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('The query to run')
                        .setRequired(true)
                )
            ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'command':
                await runCommand(interaction);
                break;
            default:
                logError(`Unknown subcommand: ${subcommand}`);
                break;
        }
    }
};

async function runCommand(interaction) {
    const query = interaction.options.getString('query');
    try {
        result = await executeQuery(query);
        let resultString = 'Query Result:\n';
        result.rows.forEach(row => {
            resultString += Object.values(row).join(', ') + '\n';
        });
        
        if (resultString.length > 2000) {
            fs.writeFileSync('result.txt', resultString);
            await interaction.reply({ files: ['result.txt'] });
            fs.unlinkSync('result.txt');
        } else {
            await interaction.reply(resultString);
        }
    } catch (err) {
        logError("Error executing command: ", err.stack);
        await interaction.reply('Error executing command: ' + err.message);
    }
}