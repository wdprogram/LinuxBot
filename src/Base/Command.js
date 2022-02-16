module.exports = class {
    constructor({
        name,
        description = 'None',
        subCommands = [],
        aliases = [],
    }) {
        this.name = name;
        this.description = description;
        this.subCommands = subCommands;
        this.aliases = aliases;
    }
};
