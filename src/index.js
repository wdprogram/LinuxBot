const Bot = require('./Base/Bot');
require('dotenv').config();

const bot = new Bot();

bot.start(process.env.TOKEN).then(() => console.log('Bot is online'));
