const { Message } = require('discord.js');
const Context = require('../Base/Context');

/**
 *
 * @param {Message} message
 */
module.exports = async (message) => {
    if (message.author.bot) return;

    const prefix = process.env.PREFIX;
    const { commands, aliases } = message.client;

    let commandName = null;
    const splitedContent = message.content.slice(prefix.length).split(/ +/g);
    if (splitedContent[0] === '') splitedContent.shift();
    commandName = splitedContent[0];
    splitedContent.shift();
    let command = null;

    if (commands.has(commandName)) command = commands.get(commandName);
    else if (aliases.has(commandName))
        command = commands.get(aliases.get(commandName));
    else return;

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
