module.exports = async (bot) => {
    bot.on("interactionCreate", async (interaction) => {
        if ( interaction.isCommand() ) {
            await interaction.deferReply().catch(() => {});
            const cmd = bot.commands.get(interaction.commandName);

            if ( !cmd ) return interaction.followUp({ content: `> This command may be outdated, or may no-longer be available.`, epheremal: true  })
            
            const args = [];

            try {
                await cmd.run({ bot, interaction, args });
            } catch ( e ) {
                return interaction.followUp({ content: `${e?.message ?? "Unknown Error"}`, epheremal: true });
            };
        }
    });
}