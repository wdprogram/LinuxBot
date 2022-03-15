import EventEmitter from 'node:events';
import API from './Discord/Api.mjs';
import Gateway from './Discord/Gateway.mjs';
import Events from './Events.mjs';
import CommandHandler from './CommandHandler.mjs';
import Collection from './Structures/Collection.mjs';

export default class Bot extends EventEmitter {
    constructor(token) {
        super({ captureRejections: true });
        this.token = token;
        this.api = new API(token);
        this.gateway = new Gateway(token, this);
        this.eventManager = new Events(this);
        this.commandHandler = new CommandHandler(this);
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    start() {
        this.eventManager.init();
        this.gateway.start();
        this.commandHandler.init();
    }
}
