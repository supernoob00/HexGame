"use strict";

import { Board } from "../src/Board";

// TODO: only test equality of array members
test("Neighbor node indices are correct", () => {
    expect(Board.neighbors(0, 3)).toEqual([1, 3]);
    expect(Board.neighbors(2, 3)).toEqual([1, 5]);
    expect(Board.neighbors(6, 3)).toEqual([3, 7]);
    expect(Board.neighbors(8, 3)).toEqual([5, 7]);
});

test("Virtual nodes on opposite sides are not connected at beginning", () => {
    let board: Board = new Board(3);
    const x1 = board.bottomVirtualNode.x;
    const y1 = board.bottomVirtualNode.y;
    const x2 = board.topVirtualNode.x;
    const y2 = board.topVirtualNode.y;

    expect(board.topVirtualNode.x).toEqual(3);
    expect(board.topVirtualNode.y).toEqual(0);
    expect(board.bottomVirtualNode.x).toEqual(3);
    expect(board.bottomVirtualNode.y).toEqual(2);

    expect(board.topVirtualNode.getNeighbors());
    expect(board.connected(board.bottomVirtualNode, board.topVirtualNode)).toBeFalsy();
});