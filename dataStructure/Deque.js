class Deque {
    items;

    constructor(items = []) {
        this.items = items;
    }

    get size() {
        return this.items.length;
    }

    pushBack = (value) => {
        this.items.push(value);
    }

    pushFront = (value) => {
        this.items.unshift(value);
    }

    back = () => {
        if (this.size) {
            return this.items.at(-1);
        }

        return 'error';
    }

    front = () => {
        if (this.size) {
            return this.items[0];
        }

        return 'error';
    }

    popBack = () => {
        if (this.size) {
            return this.items.pop();
        }

        return 'error';
    }

    popFront = () => {
        if (this.size) {
            return this.items.shift();
        }

        return 'error';
    }

    clear = () => {
        this.items = [];
    }
}

module.exports = Deque;