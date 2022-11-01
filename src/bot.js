require("dotenv").config();
const mySecret = `${process.env['Token']}`;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: GatewayIntentBits.Guilds
});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login('MTAzNTAxMTE4NjI4ODIzODczNA.GCEtfw.Cptw_1Gdvtky0pl8ORxwy8J_1NciZ1uPkNRPW4');