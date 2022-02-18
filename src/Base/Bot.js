const { Client, Collection } = require('discord.js');
const Utils = require('./Utils');
const CommandHandler = require('./CommandHandler');
const Events = require('./Events');

module.exports = class extends Client {
    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
            restTimeOffset: 100,
        });
        this.utils = Utils;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.commandHandler = new CommandHandler(this);
    }

    async start(token) {
        this.commandHandler.init();
        await new Events(this).init();
        this.login(token);
    }
};
