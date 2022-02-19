const Command = require('../../Base/Command');
module.exports = class extends Command {
    constructor() {
        super({
            name: 'eval',
            description: 'Hmm idk',
            permissions: {
                ownerOnly: true,
            },
        });
    }
    async run(ctx) {
        try {
            let codein = ctx.args.join(' ');
            if (!codein) return;
            // if (!codein.match('```.[\\s\\S]*```'))
            //     return ctx.sendEmbed({ description: 'Code block' });
            let code = eval(codein);
            if (typeof code !== 'string')
                code = require('util').inspect(code, { depth: 0 });
            ctx.sendEmbed({
                title: 'Output',
                description: `\`\`\`js\n${code.slice(0, 2000 - 12)}\n\`\`\``,
            });
        } catch (e) {
            ctx.sendEmbed({
                title: 'Error',
                description: `\`\`\`js\n${e}\n\`\`\``,
            });
        }
    }
};
