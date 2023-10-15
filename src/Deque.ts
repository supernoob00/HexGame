/**
 * Linked list implementation of a deque.
 */

class ListNode<E> {
    val: E;
    next: ListNode<E> | null;

    constructor(val: E) {
        this.val = val;
        this.next = null;
    }
}

export class Deque<E> {
    private head: ListNode<E> | null;
    private tail: ListNode<E> | null;
    private n: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.n = 0;
    }

    isEmpty(): boolean {
        return this.n === 0;
    }

    size(): number {
        return this.n;
    }

    addLast(item: E): void {
        if (this.isEmpty()) {
            this.head = new ListNode(item);
            this.tail = this.head;
        } else {
            const newTail = new ListNode(item);
            this.tail!.next = newTail;
            this.tail = newTail;
        }
        this.n++;
    }

    // removes head from list and returns value
    dequeue(): E {
        if (this.isEmpty()) {
            throw Error("Cannot dequeue from empty queue.");
        }
        const removed = this.head!;
        this.head = removed.next;

        if (this.head === null) {
            this.tail = null;
        }
        this.n--;
        return removed.val;
    }

    addFirst(item: E): void {
        const oldHead = this.head;
        this.head = new ListNode(item);
        this.head.next = oldHead;

        if (oldHead === null) {
            this.tail = this.head;
        }
        this.n++;
    }
 }