import Command from '../../Base/Structures/Command.mjs';

export default class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            description: "Sends bot's websocket ping",
        });
    }

    async run(ctx) {
        ctx.send({ content: 'Loading...' }).then((msg) => {
            const { createdTimestamp } = msg;
            const ping = createdTimestamp - ctx.message.createdTimestamp;
            msg.edit({
                content: ctx.responds.ping.final(ping),
            });
        });
    }
}
