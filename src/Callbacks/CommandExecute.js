const { Message } = require('discord.js');
const Context = require('../Base/Context');

/**
 *
 * @param {Message} message
 */
module.exports = async (message) => {
    if (message.author.bot) return;

    let prefix = process.env.PREFIX;
    const { commands, aliases } = message.client;

    let isDev = false;

    if (
        [
            '377189739759140865',
            '407486004505870336',
            '382612768924368906',
        ].includes(message.author.id)
    )
        isDev = true;

    if (message.content.startsWith(prefix) === false && !isDev) return;
    if (!message.content.startsWith(prefix) && isDev) prefix = null;

    let commandName = null;
    const splitedContent = prefix
        ? message.content.slice(prefix.length).split(/\s+/g)
        : message.content.split(/\s+/g);
    if (splitedContent[0] === '') splitedContent.shift();
    commandName = splitedContent.shift();
    let command = null;

    command =
        commands.get(commandName) || commands.get(aliases.get(commandName));
    if (!command) return;

    if (command.permissions.ownerOnly && !isDev) return;

    try {
        let context = new Context(message, prefix, splitedContent);
        if (command.subCommands.length >= 1) {
            const subCommand = String(context.args[0]).toLowerCase();
            const cmd = command.subCommands.find((e) =>
                e.aliases
                    ? e.aliases.includes(subCommand).toLowerCase()
                    : undefined || e.name === subCommand,
            );
            cmd
                ? cmd.run(new Context(message, prefix, splitedContent, true))
                : command.run(context);
        } else command.run(context);
    } catch (error) {
        message.channel.send(`Hata: ${error}`);
    }
};
