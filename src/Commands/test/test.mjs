import Command from '../../Base/Structures/Command.mjs';

export default class TestCommand extends Command {
    constructor() {
        super({
            name: 'test',
        });
    }

    async collect(i, bot) {
        switch (i.data.custom_id) {
            case 'click_one':
                const url = `/interactions/${i.id}/${i.token}/callback`;
                bot.api.post(url, {
                    type: 4,
                    data: {
                        content: 'Congrats on sending your command!',
                        flags: 1 << 6,
                    },
                });
        }
    }

    async run(ctx) {
        const { bot } = ctx.message;
        ctx.send({
            content: 'Loading...',
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: 'Click me!',
                            style: 1,
                            custom_id: 'click_one',
                        },
                    ],
                },
            ],
        }).then((msg) => {
            bot.on('interactionCreate', (i) => this.collect(i, bot));
            setTimeout(() => {
                bot.removeListener('interactionCreate', (i) =>
                    this.collect(i, bot),
                );
            }, 2000);
        });
    }
}
