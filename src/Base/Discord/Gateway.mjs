import WebSocket from 'ws';
import Message from '../Structures/Message.mjs';

let interval = 0;

export default class Gateway {
    constructor(token, bot) {
        this.token = token;
        this.bot = bot;
        this.ws = new WebSocket('wss://gateway.discord.gg/?v10&encoding=json');
    }

    async start() {
        var payload = {
            op: 2,
            d: {
                token: this.token,
                intents: 32767,
                properties: {
                    $os: 'linux',
                    $browser: 'chrome',
                    $device: 'chrome',
                },
                presence: {
                    activities: [
                        {
                            name: 'sudo help',
                            type: 0,
                        },
                    ],
                },
            },
        };

        this.ws.on('open', () => this.ws.send(JSON.stringify(payload)));

        this.ws.on('message', (data) => {
            let payload = JSON.parse(data);
            const { t, event, op, d } = payload;
            switch (op) {
                case 10:
                    const { heartbeat_interval } = d;
                    interval = this.heartbeat(heartbeat_interval);
                    break;
            }

            switch (t) {
                case 'READY':
                    this.bot.emit('ready', d.user);
                    break;
                case 'MESSAGE_CREATE':
                    this.bot.emit('messageCreate', new Message(d, this.bot));
                    break;
                case 'INTERACTION_CREATE':
                    this.bot.emit('interactionCreate', d);
            }
        });
    }

    heartbeat(ms) {
        return setInterval(() => {
            this.ws.send(JSON.stringify({ op: 2, d: null }));
        }, ms);
    }
}
