const Bot = require('./Bot');
const { readdirSync } = require('fs');
const { resolve } = require('path');

module.exports = class {
    /**
     *
     * @param {Bot} bot
     */
    constructor(bot) {
        this.bot = bot;
    }

    async init() {
        const basePath = './src/Commands';
        const dirs = readdirSync(basePath);
        for (const dir of dirs) {
            const commandNames = readdirSync(`${basePath}/${dir}`);
            for (const commandName of commandNames) {
                const command = this.importCommand(
                    `${basePath}/${dir}/${commandName}`,
                );
                this.bot.commands.set(command.name, command);
                command.aliases.forEach((aliases) =>
                    this.bot.aliases.set(aliases, command.name),
                );
            }
        }
    }

    importCommand(path) {
        return new (require(resolve(path)))();
    }
};
