module.exports = class {
    constructor({
        name,
        description = 'None',
        usage = 'None',
        subCommands = [],
        aliases = [],
        permissions = {
            ownerOnly: false,
        },
    }) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
        this.permissions = permissions;
        this.subCommands = subCommands;
    }
};
