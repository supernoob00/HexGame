/**
 * Array implementation of a FIFO queue.
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
export class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.n = 0;
    }
    isEmpty() {
        return this.n === 0;
    }
    size() {
        return this.n;
    }
    enqueue(item) {
        if (this.isEmpty()) {
            this.head = new ListNode(item);
            this.tail = this.head;
        }
        else {
            const newTail = new ListNode(item);
            this.tail.next = newTail;
            this.tail = newTail;
        }
        this.n++;
    }
    dequeue() {
        if (this.isEmpty()) {
            throw Error("Cannot dequeue from empty queue.");
        }
        const removed = this.head;
        this.head = removed.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.n--;
        return removed.val;
    }
}
//# sourceMappingURL=Queue.js.map