import { Queue } from "../src/Queue";

function emptyQueue(): Queue<number> {
    return new Queue<number>();
}

function testQueue(): Queue<number> {
    const test = new Queue<number>();
    test.enqueue(1);
    test.enqueue(2);
    return test;
}

test("Enqueuing to empty queue works as expected", () => {
    let empty = emptyQueue();
    expect(empty.isEmpty).toBeTruthy();
    expect(empty.size()).toEqual(0);

    empty.enqueue(2);

    expect(empty.isEmpty()).toBeFalsy();
    expect(empty.size()).toEqual(1);

    empty.enqueue(3);

    expect(empty.isEmpty()).toBeFalsy();
    expect(empty.size()).toEqual(2);

    let item = empty.dequeue();

    expect(item).toEqual(2);
    expect(empty.isEmpty()).toBeFalsy();
    expect(empty.size()).toEqual(1);

    item = empty.dequeue();

    expect(item).toEqual(3);
    expect(empty.isEmpty()).toBeTruthy();
    expect(empty.size()).toEqual(0);
});