import { Token } from "./Token";
import { HexNode } from "./HexNode";
import { Deque } from "./Deque";
/**
 * Model of the Hex game board, which is a grid of hexagonal
 * tiles (nodes) containing player tokens.
 */
export class Board {
    /**
     * Returns the neighbors of a node at a given [x, y] position; excludes virtual nodes.
     *
     * @param x the x-coordinate of the node whose neighbors to get
     * @param y the y-coordinate of the node whose neighbors to get
     * @returns An array of indices representing the neighbor positions.
     */
    //TODO: make private
    static neighbors(index, size) {
        const i = Math.floor(index / size);
        const j = index % size;
        // top left corner
        if (i === 0 && j == 0) {
            return [1, size];
        }
        // bottom left corner
        if (i === size - 1 && j === 0) {
            return [size * (size - 2), size * (size - 2) + 1, size * (size - 1) + 1];
        }
        // bottom right corner
        if (i === size - 1 && j === size - 1) {
            return [size * (size - 1) - 1, size * size - 2];
        }
        // top right corner
        if (i === 0 && j === size - 1) {
            return [size - 2, 2 * size - 1, 2 * size - 2];
        }
        // top edge except corners
        if (i === 0) {
            return [index - 1, index + size - 1, index + size, index + 1];
        }
        // right edge except corners
        if (j === size - 1) {
            return [index - size, index - 1, index + size - 1, index + size];
        }
        // bottom edge except corners
        if (i === size - 1) {
            return [index - 1, index - size, index - size + 1, index + 1];
        }
        // left edge except corners
        if (j === 0) {
            return [index + size, index + 1, index - size + 1, index - size];
        }
        // not an edge or corner hexagon
        return [
            index - 1,
            index - size,
            index - size + 1,
            index + 1,
            index + size,
            index + size - 1
        ];
    }
    /**
    * Given an integer n, creates an n * n game board. The primary data structure
    * representing the board is a one-dimensional HexNode[] array of size (n * n + 4).
    * The extra four nodes, which are placed on each side of the board and connected to the edge nodes
    * at their respective side, are only used in order to make the path-finding algorithms more efficient.
    * Otherwise, they are not used in the game in any way.
    *
    * @param size the number of nodes on an the board edge
    */
    constructor(size) {
        if (size < 3 || size > 30) {
            throw Error("Not a valid board size.");
        }
        this.size = size;
        // initialize HexNode array with size * size dimensions
        // and add all non-virtual nodes to it
        this.nodes = [];
        for (let i = 0; i < size * size; i++) {
            this.nodes.push(new HexNode(i, size));
        }
        // initialize virtual nodes and push to node array
        this.topVirtualNode = new HexNode(size * size, size, true);
        this.leftVirtualNode = new HexNode(size * size + 1, size, true);
        this.bottomVirtualNode = new HexNode(size * size + 2, size, true);
        this.rightVirtualNode = new HexNode(size * size + 3, size, true);
        this.nodes.push(this.topVirtualNode);
        this.nodes.push(this.leftVirtualNode);
        this.nodes.push(this.bottomVirtualNode);
        this.nodes.push(this.rightVirtualNode);
        // set appropriate token for each virtual node
        this.topVirtualNode.setToken(Token.RED);
        this.bottomVirtualNode.setToken(Token.RED);
        this.leftVirtualNode.setToken(Token.BLUE);
        this.rightVirtualNode.setToken(Token.BLUE);
        // set neighboring nodes for each non-virtual HexNode, including any 
        // neighbors which are virtual nodes
        for (let i = 0; i < size * size; i++) {
            const currentNode = this.nodes[i];
            // add all neighbor nodes for every node in board
            for (const index of Board.neighbors(i, size)) {
                // add any connected non-virtual nodes
                currentNode.addNeighbor(this.nodes[index]);
            }
            // add any connected virtual nodes
            if (currentNode.atTopEdge()) {
                currentNode.addNeighbor(this.topVirtualNode);
            }
            if (currentNode.atLeftEdge()) {
                currentNode.addNeighbor(this.leftVirtualNode);
            }
            if (currentNode.atBottomEdge()) {
                currentNode.addNeighbor(this.bottomVirtualNode);
            }
            if (currentNode.atRightEdge()) {
                currentNode.addNeighbor(this.rightVirtualNode);
            }
        }
        // set neighbors of each virtual node
        this.topEdge().forEach(edgeNode => this.topVirtualNode.addNeighbor(edgeNode));
        this.leftEdge().forEach(edgeNode => this.leftVirtualNode.addNeighbor(edgeNode));
        this.bottomEdge().forEach(edgeNode => this.bottomVirtualNode.addNeighbor(edgeNode));
        this.rightEdge().forEach(edgeNode => this.rightVirtualNode.addNeighbor(edgeNode));
    }
    getIndex(x, y) {
        return x * this.size + y;
    }
    /**
     * Gets the token on the board at the given (x, y) position
     *
     * @param x the x-coordinate of the token to retrieve
     * @param y the y-coordinate of the token to retrieve
     * @returns the token (RED, BLUE, or EMPTY) at the specified (x, y) position
     */
    getToken(x, y) {
        return this.nodes[this.getIndex(x, y)].getToken();
    }
    /**
     * Puts the token on the board at the given (x, y) position and updates the
     * union-find structure
     *
     * @param x the x-coordinate at which to place the token
     * @param y the y-coordinate at which to place the token
     * @param token
     *
     * @throws will throw an error if specified position already contains a
     * RED or BLUE token
     */
    putToken(x, y, token) {
        if (this.getToken(x, y) !== Token.EMPTY) {
            throw new Error(`Board at ${x}, ${y} already has a token.`);
        }
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken(token);
    }
    removeToken(x, y) {
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken(Token.EMPTY);
    }
    getNode(x, y) {
        return this.nodes[this.getIndex(x, y)];
    }
    connected(node1, node2, token) {
        if (node1.index === node2.index) {
            throw Error("Arguments cannot refer to the same node.");
        }
        return this.shortestPathLength(node1, node2, token) === 0;
    }
    // TODO: remove console log statements
    BFS(node1, node2, token) {
        console.log(node1);
        console.log(node2);
        if (node1.index === node2.index) {
            throw Error("Arguments cannot refer to the same node.");
        }
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(-1);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for (let i = 0; i < pathTree.length; i++) {
            pathTree[i] = i;
        }
        // queue used for BFS
        const queue = new Deque();
        // enqueue starting position
        queue.addLast(node1);
        dist[node1.index] = 0;
        while (!queue.isEmpty()) {
            const current = queue.dequeue();
            for (const neighbor of current.getNeighbors()) {
                if (neighbor.getToken() === token && dist[neighbor.index] === -1) {
                    queue.addLast(neighbor);
                    dist[neighbor.index] = dist[current.index] + 1;
                    pathTree[neighbor.index] = current.index;
                }
            }
        }
        const path = [];
        let currIndex = node2.index;
        while (currIndex !== node1.index) {
            path.push(this.nodes[currIndex]);
            currIndex = pathTree[currIndex];
        }
        path.push(this.nodes[currIndex]);
        return path;
    }
    // shortest path algorithm, returns zero if a bridge exists
    shortestPathLength(from, to, token) {
        if (from.index === to.index) {
            throw Error("Arguments cannot refer to the same node.");
        }
        const MAX_DIST = 1000;
        const enemyToken = token === Token.RED ? Token.BLUE : Token.RED;
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(MAX_DIST);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for (let i = 0; i < pathTree.length; i++) {
            pathTree[i] = i;
        }
        const deque = new Deque();
        // enqueue starting position
        deque.addLast(from);
        dist[from.index] = 0;
        while (!deque.isEmpty()) {
            const currentNode = deque.dequeue();
            for (const neighbor of currentNode.getNeighbors()) {
                if (neighbor.getToken() === enemyToken) {
                    continue;
                }
                const edgeWeight = neighbor.getToken() === token ? 0 : 1;
                if (dist[neighbor.index] > dist[currentNode.index] + edgeWeight) {
                    dist[neighbor.index] = dist[currentNode.index] + edgeWeight;
                    pathTree[neighbor.index] = currentNode.index;
                    if (neighbor.getToken() === Token.EMPTY) {
                        deque.addFirst(neighbor);
                    }
                    if (neighbor.getToken() === token) {
                        deque.addLast(neighbor);
                    }
                }
            }
        }
        // console.log("Shortest path length for " + token + ": " + dist[to.index]);
        return dist[to.index];
    }
    fillRandom() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const rand = Math.floor(Math.random() * 2);
                const token = rand === 0 ? Token.RED : Token.BLUE;
                this.putToken(i, j, token);
            }
        }
    }
    /**
     * Returns the total number of nodes in board, including
     * virtual nodes
     *
     * @returns the total number of nodes in board
     */
    allNodesCount() {
        return this.size * this.size + 4;
    }
    playableNodeCount() {
        return this.size * this.size;
    }
    playableNodes() {
        return this.nodes.slice(0, this.playableNodeCount());
    }
    /**
     * Returns the nodes in the top edge of the game board.
     *
     * @returns the nodes in the top edge as an array
     */
    topEdge() {
        return this.nodes.slice(0, this.size);
    }
    /**
     * Returns the nodes in the left edge of the game board.
     *
     * @returns the nodes in the left edge of the array
     */
    leftEdge() {
        let leftNodes = [];
        for (let i = 0; i < this.size; i++) {
            leftNodes.push(this.nodes[this.getIndex(i, 0)]);
        }
        return leftNodes;
    }
    /**
     * Returns the nodes in the bottom edge of the game board.
     *
     * @returns the nodes in the bottom edge of the array
     */
    bottomEdge() {
        return this.nodes.slice(this.size * (this.size - 1), this.size * this.size);
    }
    /**
     * Returns the nodes in the right edge of the game board.
     *
     * @returns the nodes in the right edge of the array
     */
    rightEdge() {
        let rightNodes = [];
        for (let i = 0; i < this.size; i++) {
            rightNodes.push(this.nodes[this.getIndex(i, this.size - 1)]);
        }
        return rightNodes;
    }
}
//# sourceMappingURL=Board.js.map