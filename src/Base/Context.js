const { Message, MessageEmbedOptions } = require('discord.js');
const Bot = require('./Bot');
const responds = require('./Responds');

module.exports = class {
    /**
     *
     * @param {Message} message
     * @param {String|null} prefix
     * @param {boolean} sub
     */
    constructor(message, prefix, args, sub = false) {
        this.message = message;
        /**
         * @type {Bot}
         */
        this.bot = message.client;
        this.prefix = prefix;
        this.args = args;
        this.flags = message.content.match('--')
            ? this.args
                  .filter((arg) => arg.startsWith('--'))
                  .map((flag) => flag.slice(2))
            : [];
        this.args = sub
            ? this.args.slice(1).filter((e) => !e.startsWith('--'))
            : this.args.filter((e) => !e.startsWith('--'));

        this.responds = responds;
        this.user = message.guild.me.user || null;
        this.member = message.member || null;

        this.devs = {
            ids: [
                '377189739759140865',
                '407486004505870336',
                '382612768924368906',
            ],
            tags: ['Okeanos#0017', 'renata#1000'],
        };
    }

    async send(...options) {
        const msg = await this.message.channel.send(...options);
        return msg;
    }

    async reply(...options) {
        const msg = await this.message.reply(...options);
        return msg;
    }

    /**
     *
     * @param {MessageEmbedOptions} options
     * @param {String} type
     * @returns {MessageEmbedOptions}
     */
    async sendEmbed(options, type) {
        /**
         * @type {MessageEmbedOptions}
         */
        const obj = {
            title: '',
            description: '',
            color: '',
            timestamp: null,
            fields: [],
            author: {},
            thumbnail: {},
            image: {},
            video: {},
            footer: {},
        };

        Object.assign(obj, options);

        if (type === 'err') obj.color = 'RED';
        else if (type === 'warn') obj.color = 'ORANGE';
        else if (type === 'succ') obj.color = 'GREEN';

        return this.send({ embeds: [obj] });
    }
};
