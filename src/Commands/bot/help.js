const Command = require('../../Base/Command');
const Context = require('../../Base/Context');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'help',
            description: 'Sends this message',
        });
    }

    /**
     *
     * @param {Context} ctx
     */
    async run(ctx) {
        const x = ctx.args[0] ? ctx.args[0].toLowerCase() : ctx.args[0];
        const isDir = ctx.bot.commandHandler.categories.has(x);
        const isCommand =
            ctx.bot.commands.get(x) ||
            ctx.bot.commands.find((command) => command.aliases.includes(x));

        if (!Boolean(x)) {
            const obj = {};
            for (const [k, v] of ctx.bot.commandHandler.categories) {
                const category = k.charAt(0).toUpperCase() + k.slice(1);
                const commands = v.map(
                    ({ name, description }) => `${name} ${description}`,
                );
                obj[category] = commands;
            }
            return ctx.sendEmbed({
                description: `\`\`\`json\n${JSON.stringify(
                    obj,
                    null,
                    2,
                )}\`\`\``,
            });
        }
        if (isDir) {
            const category = x.charAt(0).toUpperCase() + x.slice(1);
            let commands = ctx.bot.commandHandler.categories.get(x);
            commands = commands.map(
                ({ name, description }) => `${name} ${description}`,
            );
            const obj = {};
            obj[category] = commands;
            return ctx.sendEmbed({
                description: `\`\`\`json\n${JSON.stringify(
                    obj,
                    null,
                    2,
                )}\`\`\``,
            });
        }
        if (Boolean(isCommand)) {
            return ctx.sendEmbed({
                description: `\`\`\`json\n${JSON.stringify(
                    isCommand,
                    null,
                    2,
                )}\`\`\``,
            });
        }
    }
};
