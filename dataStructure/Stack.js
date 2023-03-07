class Stack {
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

    back = () => {
        if (this.size) {
            return this.items.at(-1);
        }

        return 'error';
    }

    pop = () => {
        if (this.size) {
            return this.items.pop();
        }

        return 'error';
    }

    clear = () => {
        this.items = [];
    }
}

module.exports = Stack;