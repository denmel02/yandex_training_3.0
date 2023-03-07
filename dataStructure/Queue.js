class Queue {
    items;

    constructor(items = []) {
        this.items = items;
    }

    get size() {
        return this.items.length;
    }

    push = (value) => {
        this.items.push(value);
    }

    front = () => {
        if (this.size) {
            return this.items[0];
        }

        return 'error';
    }

    pop = () => {
        if (this.size) {
            return this.items.shift();
        }

        return 'error';
    }

    clear = () => {
        this.items = [];
    }
}

module.exports = Queue;