const { Message } = require('discord.js');
const Bot = require('./Bot');
const responds = require('./Responds');

module.exports = class {
    /**
     *
     * @param {Message} message
     * @param {String} prefix
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
    }

    async send(...options) {
        this.message.channel.send(...options);
    }
};
