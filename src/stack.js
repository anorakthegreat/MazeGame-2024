class Stack extends Array {
    constructor() {
        super();
    }

    empty() {
        return this.length == 0;
    }

    peek() {
        return this[this.length - 1];
    }
}
