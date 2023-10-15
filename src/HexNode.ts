"use strict";

import { Token } from "./Token";

/**
 * Represents a node on a Hex board. Can either be empty, or contain a single token;
 * also contains references to its neighbor nodes.
 */
export class HexNode {
    // x and y-coordinate of HexNode
    readonly x: number;
    readonly y: number;

    // size of the Hex board that node is part of
    private readonly size: number;

    // index of HexNode in 1D array
    readonly index: number;

    // boolean values representing whether node is virtual
    readonly isVirtual: boolean;

    // neighbor nodes of this node; these are set upon initialization of the HexBoard class
    private neighbors: HexNode[] = [];

    // current token occupying this node
    private token: Token = Token.EMPTY;

    /**
     * Creates a HexNode at a given [x, y] position for a board of given size.
     * 
     * @param n the index of the node
     * @param size the size of the board where the node lives
     */
    constructor(index: number, size: number, isVirtual = false) {
        if (size === 0 && !isVirtual) {
            throw Error("Size argument must be passed for non-virtual node.");
        }

        this.size = size;
        this.index = index;
        this.x = Math.floor(index / size);
        this.y = index % size;
        this.isVirtual = isVirtual;
    }

    getToken(): Token {
        return this.token;
    }

    setToken(token: Token): void {
        this.token = token;
    }

    addNeighbor(hexNode: HexNode): void {
        this.neighbors.push(hexNode);
    }

    getNeighbors(): HexNode[] {
        return this.neighbors;
    }

    atTopEdge(): boolean {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.x === 0;
    }

    atRightEdge(): boolean {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.y === this.size - 1;
    }

    atBottomEdge(): boolean {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.x === this.size - 1;
    }

    atLeftEdge(): boolean {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.y === 0;
    }
}