const Bot = require('./Bot');
const { CommandExecute } = require('../Callbacks');

module.exports = class {
    /**
     *
     * @param {Bot} bot
     */
    constructor(bot) {
        this.bot = bot;
    }

    async init() {
        this.bot.on('messageCreate', async (message) => {
            await CommandExecute(message);
        });

        this.bot.on('messageUpdate', async (_, message) => {
            await CommandExecute(message);
        });
    }
};
