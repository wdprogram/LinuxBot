const Command = require('../../Base/Command');
const Discord = require('discord.js');
module.exports = class extends Command {
    constructor() {
        super({
            name: 'eval',
        });
    }
    async run(ctx) {
        if (!ctx.devs.ids.includes(ctx.message.author.id))
            return ctx.reply(ctx.responds.eval.devError);
        try {
            let codein = ctx.args.join(' ');
            if (!codein) return;
            let code = eval(codein);
            // code = eval(code);
            if (typeof code !== 'string')
                code = require('util').inspect(code, { depth: 0 });
            let embed = new Discord.MessageEmbed()
                .setTitle('Output')
                .setDescription(`\`\`\`js\n${code}\n\`\`\``);
            ctx.reply({ embeds: [embed] });
        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription(`\`\`\`js\n${e}\n\`\`\``);
            ctx.reply({ embeds: [embed] });
        }
    }
};
