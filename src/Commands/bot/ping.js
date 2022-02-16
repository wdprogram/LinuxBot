const Command = require('../../Base/Command');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'ping',
            subCommands: [
                {
                    name: 'test',
                    run: (ctx) => {
                        ctx.send('Test');
                    },
                },
            ],
        });
    }

    async run(ctx) {
        ctx.send(ctx.responds.ping.final(ctx.bot.ws.ping));
    }
};
