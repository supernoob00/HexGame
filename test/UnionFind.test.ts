"use strict";

import { UnionFind } from "../src/UnionFind";

let testUF = new UnionFind(10);

function setupTestUF() {
    const UF = new UnionFind(10);
    UF.union(4, 3);
    UF.union(3, 8);
    UF.union(5, 6);
    UF.union(9, 4);
    testUF = UF;
}

beforeEach(() => setupTestUF());

test("Disjoint sets are correct", () => {
    expect(testUF.connected(5, 6)).toBeTruthy();
    expect(testUF.connected(4, 9)).toBeTruthy();
    expect(testUF.connected(9, 4)).toBeTruthy();
    expect(testUF.connected(5, 7)).toBeFalsy();
});

test("Number of disjoint sets is correct", () => {
    expect(testUF.getCount()).toBe(6);
})