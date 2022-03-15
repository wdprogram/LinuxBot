import Responds from '../Responds.mjs';
import Message from './Message.mjs';

export default class Context {
    /**
     *
     * @param {String|null} prefix
     * @param {boolean} sub
     */
    constructor(message, prefix, args, sub = false) {
        this.message = message;
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

        this.devs = {
            ids: [
                '377189739759140865',
                '407486004505870336',
                '382612768924368906',
            ],
            tags: ['Okeanos#0017', 'renata#1000'],
        };

        this.responds = Responds;
    }

    async send(...options) {
        const msg = await this.message.bot.api.post(
            `/channels/${this.message.channelId}/messages`,
            ...options,
        );
        return new Message(msg, this.message.bot);
    }

    async reply(...options) {
        options.message_reference = {
            channel_id: this.message.channel_id,
            guild_id: this.message.guild_id,
            message_id: this.message.id,
        };
        const msg = await this.send(...options);
        return new Message(msg, this.message.bot);
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
            color: null,
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
}
