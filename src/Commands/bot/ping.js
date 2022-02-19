const Command = require('../../Base/Command');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'ping',
            description: "Sends bot's websocket ping",
        });
    }

    async run(ctx) {
        ctx.send(ctx.responds.ping.final(ctx.bot.ws.ping));
    }
};
