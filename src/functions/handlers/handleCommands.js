const fs = require('fs');

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        const { commands, commandArray } = client;
        for (const folder of commandFolders) {
            const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"));


            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has pass through the handler`)
            }
        }
        const clientId = '1035011186288238734';
        const guildId = '1035011639281451081';
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        try {
            console.log(`Started refreshing application (/) commands.`);
            await rest.put(Routes.applicationCommands(clientId, guildId),{
                body: commandArray, 
            });
        } catch (error) {
            console.error(error);
        }
    }
}