const { Client, Collection } = require('discord.js');
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = class ExtendedClient {
    constructor() {
        this.bot = new Client({
            intents: 14023, // Multipurpose intents.
            shards: "auto",
            presence: {
                    status: "dnd",
                    activity: {
                    type: "PLAYING",
                    text: "www.unbreakable.tk"
                }
            },
        });

        this.bot.commands = new Collection();
        this.bot.slashCommands = [];
    };

    async registerCommands () {
        const slashCommands = await globPromise(
            `${process.cwd()}/commands/*/*.js`
        );
    
        // const arrayOfSlashCommands = [];
        slashCommands.map((value) => {
            const file = require(value);
            if (!file?.name) return;
            this.bot.commands.set(file.name, file);
    
            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            this.bot.slashCommands.push(file);
        });
    };

    async registerEvents() {
        const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
        const bot = this.bot;

        eventFiles.map((value) => require(value)(bot) ?? require(value));
    };

    async start () {
        await this.bot.login( TOKEN ).then(() => console.log(`Logged in.`));
    };
};
