const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Pong!",

    run: async ({ bot, interaction }) => {
        return interaction.followUp({ content: "Pong! 🏓", epheremal: true });
    }, // RUNNING THE COMMAND
};