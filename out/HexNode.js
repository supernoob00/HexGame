"use strict";
import { Token } from "./Token";
/**
 * Represents a node on a Hex board. Can either be empty, or contain a single token;
 * also contains references to its neighbor nodes.
 */
export class HexNode {
    /**
     * Creates a HexNode at a given [x, y] position for a board of given size.
     *
     * @param n the index of the node
     * @param size the size of the board where the node lives
     */
    constructor(index, size, isVirtual = false) {
        // neighbor nodes of this node; these are set upon initialization of the HexBoard class
        this.neighbors = [];
        // current token occupying this node
        this.token = Token.EMPTY;
        if (size === 0 && !isVirtual) {
            throw Error("Size argument must be passed for non-virtual node.");
        }
        this.size = size;
        this.index = index;
        this.x = Math.floor(index / size);
        this.y = index % size;
        this.isVirtual = isVirtual;
    }
    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }
    addNeighbor(hexNode) {
        this.neighbors.push(hexNode);
    }
    getNeighbors() {
        return this.neighbors;
    }
    atTopEdge() {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.x === 0;
    }
    atRightEdge() {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.y === this.size - 1;
    }
    atBottomEdge() {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.x === this.size - 1;
    }
    atLeftEdge() {
        if (this.isVirtual) {
            throw Error("Invalid caller: HexNode is virtual.");
        }
        return this.y === 0;
    }
}
//# sourceMappingURL=HexNode.js.map