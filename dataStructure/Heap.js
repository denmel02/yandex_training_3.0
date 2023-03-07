class Heap {
    items;

    constructor(items = []) {
        this.items = items.sort((a, b) => a - b);
    }

    get size() {
        return this.items.length;
    }

    insert = (value) => {
        const index = this.items.findIndex((numb) => numb >= value);

        this.items.splice(index === -1 ? this.size : index, 0, value);
    }

    extract = () => {
        if (this.size) {
            return this.items.pop();
        }

        return 'error';
    }

    clear = () => {
        this.items = [];
    }
}

module.exports = Heap;