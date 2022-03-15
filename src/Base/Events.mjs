import { readFileSync } from 'node:fs';
import CommandCreate from './Callbacks/CommandCreate.mjs';

const { prefix } = JSON.parse(readFileSync('./src/config.json', 'utf-8'));

export default class Events {
    constructor(bot) {
        this.bot = bot;
    }

    async init() {
        this.bot.on('ready', () => console.log('Merhaba'));

        this.bot.on('messageCreate', async (message) => {
            CommandCreate(message, this.bot);
        });
    }
}
