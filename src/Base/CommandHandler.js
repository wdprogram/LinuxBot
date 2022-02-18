const Bot = require('./Bot');
const { readdirSync } = require('fs');
const { resolve } = require('path');
const { Collection } = require('discord.js');

module.exports = class {
    /**
     *
     * @param {Bot} bot
     */
    constructor(bot) {
        this.bot = bot;
        this.categories = new Collection();
    }

    async init() {
        const basePath = './src/Commands';
        const dirs = readdirSync(basePath);
        for (const dir of dirs) {
            if (!this.categories.has(dir)) this.categories.set(dir, []);
            const category = this.categories.get(dir);
            const commandNames = readdirSync(`${basePath}/${dir}`);
            for (const commandName of commandNames) {
                const command = this.importCommand(
                    `${basePath}/${dir}/${commandName}`,
                );
                if (!category.includes(command)) category.push(command);
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
