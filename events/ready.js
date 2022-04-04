module.exports = async (bot) => {
    bot.on("ready", () => {
        const GUILD = bot.guilds.cache.get("925927210282549289");

        GUILD.commands.set( bot.slashCommands ).then(() => `${bot.slashCommands?.length} Loaded!`);
    });
};