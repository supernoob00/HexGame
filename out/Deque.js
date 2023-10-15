/**
 * Linked list implementation of a deque.
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
export class Deque {
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
    addLast(item) {
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
    // removes head from list and returns value
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
    addFirst(item) {
        const oldHead = this.head;
        this.head = new ListNode(item);
        this.head.next = oldHead;
        if (oldHead === null) {
            this.tail = this.head;
        }
        this.n++;
    }
}
//# sourceMappingURL=Deque.js.map