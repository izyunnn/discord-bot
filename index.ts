import DiscordJS from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const {Client, GatewayIntentBits} = require('discord.js')
const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
})

client.on('ready', () => {
    console.log('123')
})

client.on('messageCreate', (message) => {
    if(message.content === 'ping'){
        message.reply({
            content: 'pong'
        })
    }
})

client.login(process.env.TOKEN)