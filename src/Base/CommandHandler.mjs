import { readdirSync } from 'node:fs';
import Collection from './Structures/Collection.mjs';

export default class CommandHandler {
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
                const command = await this.importCommand(
                    `../../src/Commands/${dir}/${commandName}`,
                );
                if (!category.includes(command)) category.push(command);
                this.bot.commands.set(command.name, command);
                command.aliases.forEach((aliases) =>
                    this.bot.aliases.set(aliases, command.name),
                );
            }
        }
    }

    async importCommand(path) {
        const { default: commandConstructor } = await import(path);
        return new commandConstructor();
    }
}
