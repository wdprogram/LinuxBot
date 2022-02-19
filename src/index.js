const Bot = require('./Base/Bot');
require('dotenv').config();

const bot = new Bot(); //bot

bot.start(process.env.TOKEN).then(() => console.log('Bot is ready'));
