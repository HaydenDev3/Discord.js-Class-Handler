require('dotenv').config();
const { ExtendedClient } = require('discord.js');

const bot = new ExtendedClient();

try {
    bot.registerCommands(); // Registering our Slash Commands.
    bot.registerEvents(); // Registering our Events.
    bot.start(); // Logging into our bot.
} catch(e) {
    console.log(`Error: ${e?.message ?? "Unknown Error"}`);
}
