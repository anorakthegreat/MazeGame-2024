// Interesting JS queueueueue implementation (modified)
// https://www.geeksforgeeks.org/implementation-queue-javascript/
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    
    enqueue(item) {
        this.items[this.backIndex++] = item;
    }
    
    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex++];
        return item;
    }

    /* Alias for `enqueue` */
    push(item) {
        this.enqueue(item);
    }

    /* Alias for `dequeue` */
    pop() {
        return this.dequeue();
    }

    peek() {
        return this.items[this.frontIndex];
    }

    empty() {
        return this.frontIndex === this.backIndex;
    }
}
