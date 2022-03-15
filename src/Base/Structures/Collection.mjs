export default class Collection extends Map {
    constructor() {
        super();
    }

    find(fn) {
        for (const i of this.values()) {
            if (fn(i)) {
                return i;
            }
        }
    }

    filter(fn) {
        return [...this.values()].filter(fn);
    }
}
