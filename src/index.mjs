import Bot from './Base/Bot.mjs';
import { readFileSync } from 'node:fs';

const { token } = JSON.parse(readFileSync('./src/config.json', 'utf-8'));

const bot = new Bot(token);

bot.start();
