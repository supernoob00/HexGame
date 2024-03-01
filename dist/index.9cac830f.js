/**
 * Represents the three possible, singular states of each tile on the Hex game board.
 * The common convention is for red to go first.
 */ var $cbc6d97b232e082b$export$50792b0e93539fde;
(function(Token) {
    Token[Token["RED"] = 0] = "RED";
    Token[Token["BLUE"] = 1] = "BLUE";
    Token[Token["EMPTY"] = 2] = "EMPTY";
})($cbc6d97b232e082b$export$50792b0e93539fde || ($cbc6d97b232e082b$export$50792b0e93539fde = {}));




"use strict";
class $18c5155eaeca66e3$export$d0643b2bbb8f124f {
    /**
     * Creates a HexNode at a given [x, y] position for a board of given size.
     * 
     * @param n the index of the node
     * @param size the size of the board where the node lives
     */ constructor(index, size, isVirtual = false){
        // neighbor nodes of this node; these are set upon initialization of the HexBoard class
        this.neighbors = [];
        // current token occupying this node
        this.token = (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY;
        if (size === 0 && !isVirtual) throw Error("Size argument must be passed for non-virtual node.");
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
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.x === 0;
    }
    atRightEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.y === this.size - 1;
    }
    atBottomEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.x === this.size - 1;
    }
    atLeftEdge() {
        if (this.isVirtual) throw Error("Invalid caller: HexNode is virtual.");
        return this.y === 0;
    }
}


/**
 * Linked list implementation of a deque.
 */ class $33a0cb0b536af615$var$ListNode {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
class $33a0cb0b536af615$export$ea49e7a4f1c1ecfe {
    constructor(){
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
            this.head = new $33a0cb0b536af615$var$ListNode(item);
            this.tail = this.head;
        } else {
            const newTail = new $33a0cb0b536af615$var$ListNode(item);
            this.tail.next = newTail;
            this.tail = newTail;
        }
        this.n++;
    }
    // removes head from list and returns value
    dequeue() {
        if (this.isEmpty()) throw Error("Cannot dequeue from empty queue.");
        const removed = this.head;
        this.head = removed.next;
        if (this.head === null) this.tail = null;
        this.n--;
        return removed.val;
    }
    addFirst(item) {
        const oldHead = this.head;
        this.head = new $33a0cb0b536af615$var$ListNode(item);
        this.head.next = oldHead;
        if (oldHead === null) this.tail = this.head;
        this.n++;
    }
}


class $b5d752865cea2d1b$export$dc537a3a3893548e {
    static #_ = (()=>{
        this.Board11x11 = new $b5d752865cea2d1b$export$dc537a3a3893548e(11);
    })();
    /**
     * Returns the neighbors of a node at a given [x, y] position; excludes virtual nodes.
     * 
     * @param x the x-coordinate of the node whose neighbors to get
     * @param y the y-coordinate of the node whose neighbors to get
     * @returns An array of indices representing the neighbor positions.
     */ //TODO: make private
    static neighbors(index, size) {
        const i = Math.floor(index / size);
        const j = index % size;
        // top left corner
        if (i === 0 && j == 0) return [
            1,
            size
        ];
        // bottom left corner
        if (i === size - 1 && j === 0) return [
            size * (size - 2),
            size * (size - 2) + 1,
            size * (size - 1) + 1
        ];
        // bottom right corner
        if (i === size - 1 && j === size - 1) return [
            size * (size - 1) - 1,
            size * size - 2
        ];
        // top right corner
        if (i === 0 && j === size - 1) return [
            size - 2,
            2 * size - 1,
            2 * size - 2
        ];
        // top edge except corners
        if (i === 0) return [
            index - 1,
            index + size - 1,
            index + size,
            index + 1
        ];
        // right edge except corners
        if (j === size - 1) return [
            index - size,
            index - 1,
            index + size - 1,
            index + size
        ];
        // bottom edge except corners
        if (i === size - 1) return [
            index - 1,
            index - size,
            index - size + 1,
            index + 1
        ];
        // left edge except corners
        if (j === 0) return [
            index + size,
            index + 1,
            index - size + 1,
            index - size
        ];
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
     */ constructor(size){
        if (size < 3 || size > 30) throw Error("Not a valid board size.");
        this.size = size;
        // initialize HexNode array with size * size dimensions
        // and add all non-virtual nodes to it
        this.nodes = [];
        for(let i = 0; i < size * size; i++)this.nodes.push(new (0, $18c5155eaeca66e3$export$d0643b2bbb8f124f)(i, size));
        // initialize virtual nodes and push to node array
        this.topVirtualNode = new (0, $18c5155eaeca66e3$export$d0643b2bbb8f124f)(size * size, size, true);
        this.leftVirtualNode = new (0, $18c5155eaeca66e3$export$d0643b2bbb8f124f)(size * size + 1, size, true);
        this.bottomVirtualNode = new (0, $18c5155eaeca66e3$export$d0643b2bbb8f124f)(size * size + 2, size, true);
        this.rightVirtualNode = new (0, $18c5155eaeca66e3$export$d0643b2bbb8f124f)(size * size + 3, size, true);
        this.nodes.push(this.topVirtualNode);
        this.nodes.push(this.leftVirtualNode);
        this.nodes.push(this.bottomVirtualNode);
        this.nodes.push(this.rightVirtualNode);
        // set appropriate token for each virtual node
        this.topVirtualNode.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).RED);
        this.bottomVirtualNode.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).RED);
        this.leftVirtualNode.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE);
        this.rightVirtualNode.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE);
        // set neighboring nodes for each non-virtual HexNode, including any 
        // neighbors which are virtual nodes
        for(let i = 0; i < size * size; i++){
            const currentNode = this.nodes[i];
            // add all neighbor nodes for every node in board
            for (const index of $b5d752865cea2d1b$export$dc537a3a3893548e.neighbors(i, size))// add any connected non-virtual nodes
            currentNode.addNeighbor(this.nodes[index]);
            // add any connected virtual nodes
            if (currentNode.atTopEdge()) currentNode.addNeighbor(this.topVirtualNode);
            if (currentNode.atLeftEdge()) currentNode.addNeighbor(this.leftVirtualNode);
            if (currentNode.atBottomEdge()) currentNode.addNeighbor(this.bottomVirtualNode);
            if (currentNode.atRightEdge()) currentNode.addNeighbor(this.rightVirtualNode);
        }
        // set neighbors of each virtual node
        this.topEdge().forEach((edgeNode)=>this.topVirtualNode.addNeighbor(edgeNode));
        this.leftEdge().forEach((edgeNode)=>this.leftVirtualNode.addNeighbor(edgeNode));
        this.bottomEdge().forEach((edgeNode)=>this.bottomVirtualNode.addNeighbor(edgeNode));
        this.rightEdge().forEach((edgeNode)=>this.rightVirtualNode.addNeighbor(edgeNode));
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
     */ getToken(x, y) {
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
     */ putToken(x, y, token) {
        if (this.getToken(x, y) !== (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) throw new Error(`Board at ${x}, ${y} already has a token.`);
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken(token);
    }
    removeToken(x, y) {
        const index = this.getIndex(x, y);
        const selectedNode = this.nodes[index];
        selectedNode.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY);
    }
    getNode(x, y) {
        return this.nodes[this.getIndex(x, y)];
    }
    connected(node1, node2, token) {
        if (node1.index === node2.index) throw Error("Arguments cannot refer to the same node.");
        return this.shortestPathLength(node1, node2, token) === 0;
    }
    // TODO: remove console log statements
    BFS(node1, node2, token) {
        console.log(node1);
        console.log(node2);
        if (node1.index === node2.index) throw Error("Arguments cannot refer to the same node.");
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(-1);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for(let i = 0; i < pathTree.length; i++)pathTree[i] = i;
        // queue used for BFS
        const queue = new (0, $33a0cb0b536af615$export$ea49e7a4f1c1ecfe)();
        // enqueue starting position
        queue.addLast(node1);
        dist[node1.index] = 0;
        while(!queue.isEmpty()){
            const current = queue.dequeue();
            for (const neighbor of current.getNeighbors())if (neighbor.getToken() === token && dist[neighbor.index] === -1) {
                queue.addLast(neighbor);
                dist[neighbor.index] = dist[current.index] + 1;
                pathTree[neighbor.index] = current.index;
            }
        }
        const path = [];
        let currIndex = node2.index;
        while(currIndex !== node1.index){
            path.push(this.nodes[currIndex]);
            currIndex = pathTree[currIndex];
        }
        path.push(this.nodes[currIndex]);
        return path;
    }
    // shortest path algorithm, returns zero if a bridge exists
    shortestPathLength(from, to, token) {
        if (from.index === to.index) throw Error("Arguments cannot refer to the same node.");
        const MAX_DIST = 1000;
        const enemyToken = token === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED ? (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE : (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED;
        // distance of each node from origin along bridge
        const dist = new Array(this.allNodesCount()).fill(MAX_DIST);
        // shortest-paths tree to origin from connected nodes
        const pathTree = new Array(this.allNodesCount());
        for(let i = 0; i < pathTree.length; i++)pathTree[i] = i;
        const deque = new (0, $33a0cb0b536af615$export$ea49e7a4f1c1ecfe)();
        // enqueue starting position
        deque.addLast(from);
        dist[from.index] = 0;
        while(!deque.isEmpty()){
            const currentNode = deque.dequeue();
            for (const neighbor of currentNode.getNeighbors()){
                if (neighbor.getToken() === enemyToken) continue;
                const edgeWeight = neighbor.getToken() === token ? 0 : 1;
                if (dist[neighbor.index] > dist[currentNode.index] + edgeWeight) {
                    dist[neighbor.index] = dist[currentNode.index] + edgeWeight;
                    pathTree[neighbor.index] = currentNode.index;
                    if (neighbor.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) deque.addFirst(neighbor);
                    if (neighbor.getToken() === token) deque.addLast(neighbor);
                }
            }
        }
        // console.log("Shortest path length for " + token + ": " + dist[to.index]);
        return dist[to.index];
    }
    fillRandom() {
        for(let i = 0; i < this.size; i++)for(let j = 0; j < this.size; j++){
            const rand = Math.floor(Math.random() * 2);
            const token = rand === 0 ? (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED : (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE;
            this.putToken(i, j, token);
        }
    }
    /**
     * Returns the total number of nodes in board, including 
     * virtual nodes
     * 
     * @returns the total number of nodes in board
     */ allNodesCount() {
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
     */ topEdge() {
        return this.nodes.slice(0, this.size);
    }
    /**
     * Returns the nodes in the left edge of the game board.
     * 
     * @returns the nodes in the left edge of the array
     */ leftEdge() {
        let leftNodes = [];
        for(let i = 0; i < this.size; i++)leftNodes.push(this.nodes[this.getIndex(i, 0)]);
        return leftNodes;
    }
    /**
     * Returns the nodes in the bottom edge of the game board.
     * 
     * @returns the nodes in the bottom edge of the array
     */ bottomEdge() {
        return this.nodes.slice(this.size * (this.size - 1), this.size * this.size);
    }
    /**
     * Returns the nodes in the right edge of the game board.
     * 
     * @returns the nodes in the right edge of the array
     */ rightEdge() {
        let rightNodes = [];
        for(let i = 0; i < this.size; i++)rightNodes.push(this.nodes[this.getIndex(i, this.size - 1)]);
        return rightNodes;
    }
}



"use strict";


class $b760b6851452172f$export$2f63f3c4f41cac3b {
    static #_ = (()=>{
        this.MINIMAX_MAX_VAL = 1000;
    })();
    static #_1 = (()=>{
        this.MINIMAX_MIN_VAL = -1000;
    })();
    static #_2 = (()=>{
        this.MAXIMIZER_TOKEN = (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED;
    })();
    static #_3 = (()=>{
        this.MINIMIZER_TOKEN = (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE;
    })();
    static #_4 = (()=>{
        this.openingMoves = [
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(1, 2),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(3, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(5, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(6, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(7, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(8, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(9, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(10, 0),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(2, 5),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(9, 2),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(8, 5),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(1, 8),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(0, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(2, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(3, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(5, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(6, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(7, 10),
            (0, $b5d752865cea2d1b$export$dc537a3a3893548e).Board11x11.getNode(8, 10)
        ];
    })();
    constructor(board, searchDepth){
        this.board = board;
        this.searchDepth = searchDepth;
    }
    chooseBestMove(tokenToPlace) {
        if (tokenToPlace === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED) return this.chooseBestMoveAsMaximizer();
        return this.chooseBestMoveAsMinimizer();
    }
    chooseOpeningRedMove() {
        const rand1 = Math.floor(Math.random() * 3 + 4);
        const rand2 = Math.floor(Math.random() * 3 + 4);
        return this.board.getNode(rand1, rand2);
    }
    chooseBestMoveAsMaximizer() {
        let max = $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MIN_VAL - 1;
        let bestMove;
        for (const node of this.board.playableNodes())if (node.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
            node.setToken($b760b6851452172f$export$2f63f3c4f41cac3b.MAXIMIZER_TOKEN);
            const evalResult = this.minimax(this.searchDepth, false);
            node.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY);
            if (evalResult > max) {
                max = evalResult;
                bestMove = node;
            }
        }
        return bestMove;
    }
    chooseBestMoveAsMinimizer() {
        let min = $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MAX_VAL + 1;
        let bestMove;
        for (const node of this.board.playableNodes())if (node.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
            node.setToken($b760b6851452172f$export$2f63f3c4f41cac3b.MINIMIZER_TOKEN);
            const evalResult = this.minimax(this.searchDepth, true);
            node.setToken((0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY);
            if (evalResult < min) {
                min = evalResult;
                bestMove = node;
            }
        }
        return bestMove;
    }
    evaluate() {
        const redMovesLeft = this.board.shortestPathLength(this.board.topVirtualNode, this.board.bottomVirtualNode, (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED);
        const blueMovesLeft = this.board.shortestPathLength(this.board.leftVirtualNode, this.board.rightVirtualNode, (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE);
        return blueMovesLeft - redMovesLeft;
    }
    minimax(depth, isMax) {
        return this._minimax(depth, isMax, $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MIN_VAL, $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MAX_VAL);
    }
    _minimax(depth, isMax, alpha, beta) {
        const evaluation = this.evaluate();
        if (evaluation === $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MAX_VAL) return $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MAX_VAL;
        if (evaluation === $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MIN_VAL) return $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MIN_VAL;
        if (depth === 0) return evaluation;
        const currentToken = isMax ? (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED : (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE;
        if (isMax) {
            let best = $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MIN_VAL;
            for (const node of this.board.nodes)if (node.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
                this.board.putToken(node.x, node.y, currentToken);
                best = Math.max(best, this._minimax(depth - 1, !isMax, alpha, beta));
                this.board.removeToken(node.x, node.y);
                if (best > beta) break;
                alpha = Math.max(alpha, best);
            }
            return best;
        } else {
            let best = $b760b6851452172f$export$2f63f3c4f41cac3b.MINIMAX_MAX_VAL;
            for (const node of this.board.nodes)if (node.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
                this.board.putToken(node.x, node.y, currentToken);
                best = Math.min(best, this._minimax(depth - 1, !isMax, alpha, beta));
                this.board.removeToken(node.x, node.y);
                if (best < alpha) break;
                beta = Math.min(beta, best);
            }
            return best;
        }
    }
}


class $cec8df7c1a458b34$export$dd37bcc5a24d523f {
    constructor(display){
        this.display = display;
        this.game = display.game;
        this.evaluator = new (0, $b760b6851452172f$export$2f63f3c4f41cac3b)(this.game.board, 1);
        this.firstMovePlayed = false;
    }
    applyMove(x, y) {
        this.placeToken(x, y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else {
            this.game.switchPlayer();
            if (this.firstMovePlayed) setTimeout(this.aiMove.bind(this), 200);
            else setTimeout(this.aiRandomMove.bind(this), 200);
        }
    }
    aiMove() {
        let bestMove;
        if (this.firstMovePlayed) bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
        else if (this.game.getCurrentPlayer() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED) bestMove = this.evaluator.chooseOpeningRedMove();
        this.placeToken(bestMove.x, bestMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    aiRandomMove() {
        let availableMoves = [];
        for (const node of this.game.board.playableNodes())if (node.getToken() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) availableMoves.push(node);
        if (availableMoves.length === 0) throw Error("No available moves");
        const random = Math.floor(Math.random() * availableMoves.length);
        const randomMove = availableMoves[random];
        this.placeToken(randomMove.x, randomMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) this.makeWinner(this.game.getCurrentPlayer());
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    placeToken(x, y) {
        this.firstMovePlayed = true;
        this.display.fillHexagon(x, y, this.game.getCurrentPlayer());
        this.game.placeToken(x, y);
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}



"use strict";
class $014f4e9ab2325c0b$export$76748c987176663a {
    static #_ = (()=>{
        this.CANVAS_HRZ_BORDER = 70;
    })();
    static #_1 = (()=>{
        this.CANVAS_VERT_BORDER = 50;
    })();
    static #_2 = (()=>{
        this.HEXAGON_SIDE_COUNT = 6;
    })();
    static #_3 = (()=>{
        this.HEXAGON_INTERIOR_ANGLE = Math.PI / 3;
    })();
    static #_4 = (()=>{
        this.FONT = "bold 16px sans-serif";
    })();
    static #_5 = (()=>{
        this.FONT_COLOR = "white";
    })();
    static #_6 = (()=>{
        this.BOARD_COLOR = "#46424f";
    })();
    static #_7 = (()=>{
        this.RED_COLOR_VALUE = "red";
    })();
    static #_8 = (()=>{
        this.BLUE_COLOR_VALUE = "blue";
    })();
    static #_9 = (()=>{
        this.RED_HOVER_COLOR = "rgba(200, 0, 0, 0.3)";
    })();
    static #_10 = (()=>{
        this.BLUE_HOVER_COLOR = "rgba(0, 0, 200, 0.3)";
    })();
    static #_11 = (()=>{
        this.TRAIL_COLOR_VALUE = "yellow";
    })();
    static #_12 = (()=>{
        this.EMPTY_TILE_COLOR = "lightgrey";
    })();
    static #_13 = (()=>{
        this.GRID_ORIGIN_X = this.CANVAS_HRZ_BORDER;
    })();
    static #_14 = (()=>{
        this.GRID_ORIGIN_Y = this.CANVAS_VERT_BORDER;
    })();
    constructor(gap, game){
        this.GAME_INFO = document.getElementById("game-info");
        this.CANVAS = document.getElementById("game-canvas");
        this.CTX = this.CANVAS.getContext("2d");
        this.CANVAS_HEIGHT = this.CANVAS.clientHeight;
        this.CANVAS_WIDTH = this.CANVAS.clientWidth;
        this.CANVAS_ORIGIN_X = this.CANVAS.offsetLeft + this.CANVAS.clientLeft;
        this.CANVAS_ORIGIN_Y = this.CANVAS.offsetTop + this.CANVAS.clientTop;
        this.gap = gap;
        this.game = game;
        this.sideCount = game.board.size;
        this.hexRadius = this.CANVAS_HEIGHT / this.sideCount * 0.5;
        this.hexFlatToFlat = this.hexRadius * Math.sqrt(3);
        this.bottomOffset = this.hexFlatToFlat / 2 * this.sideCount;
        this.totalGapLength = gap * (this.sideCount + 1);
        this.hexPaths2D = this.createHexPaths2D($014f4e9ab2325c0b$export$76748c987176663a.GRID_ORIGIN_X, $014f4e9ab2325c0b$export$76748c987176663a.GRID_ORIGIN_Y);
        this.inputActive = true;
        this.activeHoverNode = null;
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.BOARD_COLOR;
        this.CTX.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
    /**
     * Draws a grid of hexagons to the canvas.
     */ drawHexagons() {
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.EMPTY_TILE_COLOR;
        for (const row of this.hexPaths2D)for (const path of row)this.CTX.fill(path);
    }
    drawBorder() {
        // draw red border
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.RED_COLOR_VALUE;
    }
    drawText() {
        this.CTX.font = $014f4e9ab2325c0b$export$76748c987176663a.FONT;
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.FONT_COLOR;
        const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L"
        ];
        const coordOriginX = $014f4e9ab2325c0b$export$76748c987176663a.CANVAS_HRZ_BORDER + this.bottomOffset + this.gap * 3;
        const coordOriginY = $014f4e9ab2325c0b$export$76748c987176663a.CANVAS_VERT_BORDER + (this.hexFlatToFlat / 2 * Math.sqrt(3) + this.gap) * this.sideCount;
        // draw column letters
        for(let i = 0; i < this.sideCount; i++)this.CTX.fillText(letters[i], coordOriginX + (this.hexFlatToFlat + this.gap) * i, coordOriginY);
        // draw row numbers
        for(let j = 0; j < this.sideCount; j++){
            const numText = (j + 1).toString();
            const numTextWidth = this.CTX.measureText(numText).width;
            this.CTX.fillText(numText, 30 - numTextWidth + (this.gap / 2 + this.hexFlatToFlat / 2) * j, $014f4e9ab2325c0b$export$76748c987176663a.CANVAS_VERT_BORDER + 2 + this.gap + (this.gap + this.hexFlatToFlat / 2 * Math.sqrt(3)) * j);
        }
    }
    drawGameInfo() {
        if (this.game.isGameOver()) this.GAME_INFO.textContent = (this.game.getWinner() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED ? "Red" : "Blue") + " won!";
        else this.GAME_INFO.textContent = (this.game.getCurrentPlayer() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED ? "Red" : "Blue") + " to move.";
    }
    /**
     * Draws current game state to canvas.
     */ draw() {
        this.drawHexagons();
        this.drawText();
        this.drawGameInfo();
    }
    /**
     * Fills hexagon at (x, y) position with given color, representing a token placed.
     * 
     * @param x the x-position of the hexagon to fill
     * @param y the y-position of the hexagon to fill
     * @param token the token color used to fill the hexagon
     */ fillHexagon(x, y, token) {
        const path2D = this.hexPaths2D[x][y];
        if (token === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED) this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.RED_COLOR_VALUE;
        else this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.BLUE_COLOR_VALUE;
        this.CTX.fill(path2D);
    }
    highlightWinPath(nodes) {
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.TRAIL_COLOR_VALUE;
        let i = 1;
        for (const node of nodes){
            const path2d = this.hexPaths2D[node.x][node.y];
            setInterval(()=>this.CTX.fill(path2d), i * 250);
            i++;
        }
    }
    showThinkingIcon() {
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.FONT_COLOR;
        this.CTX.fillText("thinking...", 600, 180);
    }
    hideThinkingIcon() {
        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.BOARD_COLOR;
        this.CTX.fillRect(600, 10, 100, 100);
    }
    /**
     * Creates a hexagon Path2D object with the given location and size.
     * 
     * @param centerX the center x-coordinate of hexagon
     * @param centerY the center y-coordinate of hexagon
     * @param r the radius of the hexagon, which also equals its side length
     * @returns the hexagon Path2D object
     */ hexPath2D(centerX, centerY, r) {
        let x = centerX;
        let y = centerY - r;
        const path = new Path2D();
        path.moveTo(x, y);
        for(let i = 0; i < $014f4e9ab2325c0b$export$76748c987176663a.HEXAGON_SIDE_COUNT; i++){
            x += r * Math.cos($014f4e9ab2325c0b$export$76748c987176663a.HEXAGON_INTERIOR_ANGLE / 2 + i * $014f4e9ab2325c0b$export$76748c987176663a.HEXAGON_INTERIOR_ANGLE);
            y += r * Math.sin($014f4e9ab2325c0b$export$76748c987176663a.HEXAGON_INTERIOR_ANGLE / 2 + i * $014f4e9ab2325c0b$export$76748c987176663a.HEXAGON_INTERIOR_ANGLE);
            path.lineTo(x, y);
        }
        return path;
    }
    /**
     * Creates an array of Path2D objects representing the game board.
     * 
     * @param startCenterX the center x-coordinate of the top left hexagon within the grid
     * @param startCenterY the center y-coordinate of the top left hexagon within the grid
     * @returns an array of Path2D objects representing the hexagon tiles
     */ createHexPaths2D(startCenterX, startCenterY) {
        const hexPaths2D = [];
        for(let i = 0; i < this.sideCount; i++)hexPaths2D.push([]);
        // TODO: clean up all derived values
        const rowOffset = this.hexFlatToFlat / 2 * Math.sqrt(3);
        let currentX = startCenterX;
        let currentY = startCenterY;
        for(let i = 0; i < this.sideCount; i++){
            currentX = startCenterX + (this.hexFlatToFlat / 2 + this.gap / 2) * i;
            for(let j = 0; j < this.sideCount; j++){
                hexPaths2D[i].push(this.hexPath2D(currentX, currentY, this.hexRadius));
                currentX = currentX + this.gap + this.hexFlatToFlat;
            }
            currentY = currentY + this.gap + rowOffset;
        }
        return hexPaths2D;
    }
    clearDisplay() {
        this.CTX.fillStyle = "white";
        this.CTX.fillRect(this.CANVAS_ORIGIN_X, this.CANVAS_ORIGIN_Y, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
    disableInput() {
        this.inputActive = false;
    }
    enableInput() {
        this.inputActive = true;
    }
    addInputHandling(controller) {
        this.controller = controller;
        // add click events to tiles
        this.CANVAS.addEventListener("click", (event)=>{
            if (!this.inputActive) return;
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            for(let i = 0; i < this.sideCount; i++)for(let j = 0; j < this.sideCount; j++){
                const path = this.hexPaths2D[i][j];
                if (this.CTX.isPointInPath(path, x, y) && this.game.getToken(i, j) === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
                    this.activeHoverNode = null;
                    controller.applyMove(i, j);
                    this.drawGameInfo();
                    return;
                }
            }
        });
        // TODO: wrong hover color when playing AI after turn change
        this.CANVAS.addEventListener("mousemove", (event)=>{
            if (!this.inputActive) return;
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            const tokenToPlace = this.game.getCurrentPlayer();
            const color = tokenToPlace === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED ? $014f4e9ab2325c0b$export$76748c987176663a.RED_HOVER_COLOR : $014f4e9ab2325c0b$export$76748c987176663a.BLUE_HOVER_COLOR;
            const oldHoverNode = this.activeHoverNode;
            for(let i = 0; i < this.sideCount; i++)for(let j = 0; j < this.sideCount; j++){
                const path = this.hexPaths2D[i][j];
                if (this.CTX.isPointInPath(path, x, y) && this.game.getToken(i, j) === (0, $cbc6d97b232e082b$export$50792b0e93539fde).EMPTY) {
                    if (path === this.activeHoverNode) {
                        this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.EMPTY_TILE_COLOR;
                        this.CTX.fill(path);
                        this.CTX.fillStyle = color;
                        this.CTX.fill(path);
                    } else {
                        if (this.activeHoverNode !== null) {
                            this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.EMPTY_TILE_COLOR;
                            this.CTX.fill(this.activeHoverNode);
                        }
                        this.CTX.fill(path);
                        this.activeHoverNode = path;
                    }
                    return;
                }
            }
            if (this.activeHoverNode !== null) {
                this.CTX.fillStyle = $014f4e9ab2325c0b$export$76748c987176663a.EMPTY_TILE_COLOR;
                this.CTX.fill(this.activeHoverNode);
                this.activeHoverNode = null;
            }
        });
        // cursor changes to pointer when hovering over canvas
        this.CANVAS.addEventListener("mouseenter", ()=>{
            document.body.style.cursor = "pointer";
        });
        // cursor reverts to default when leaving canvas
        this.CANVAS.addEventListener("mouseleave", ()=>{
            document.body.style.cursor = "default";
        });
    }
}




class $959dbcec7d4dd44d$export$985739bfa5723e08 {
    constructor(boardSize){
        this.board = new (0, $b5d752865cea2d1b$export$dc537a3a3893548e)(boardSize);
        this.currentPlayer = (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED;
        this.winner = null;
    }
    getToken(x, y) {
        return this.board.getToken(x, y);
    }
    placeToken(x, y) {
        this.board.putToken(x, y, this.currentPlayer);
    }
    playTurn(x, y) {
        if (this.isGameOver()) throw Error("Game has already ended.");
        this.board.putToken(x, y, this.currentPlayer);
        if (this.isWinner(this.currentPlayer)) this.winner = this.currentPlayer;
        else this.switchPlayer();
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    isGameOver() {
        return this.winner !== null;
    }
    getWinner() {
        if (this.winner === null) throw Error("Game is not over");
        return this.winner;
    }
    setWinner(token) {
        if (this.isGameOver()) throw new Error("Game is already over.");
        this.winner = token;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED ? (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE : (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED;
    }
    isWinner(token) {
        if (token === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED) return this.board.connected(this.board.topVirtualNode, this.board.bottomVirtualNode, token);
        return this.board.connected(this.board.leftVirtualNode, this.board.rightVirtualNode, token);
    }
    getWinBridge() {
        if (!this.isGameOver()) throw Error("Game is not over.");
        if (this.getWinner() === (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED) return this.board.BFS(this.board.topVirtualNode, this.board.bottomVirtualNode, (0, $cbc6d97b232e082b$export$50792b0e93539fde).RED).slice(1, -1);
        else return this.board.BFS(this.board.leftVirtualNode, this.board.rightVirtualNode, (0, $cbc6d97b232e082b$export$50792b0e93539fde).BLUE).slice(1, -1);
    }
}


class $f2bd93d1bc05a04b$export$862991097cec0aa4 {
    constructor(display){
        this.display = display;
        this.game = display.game;
        this.firstPlayerMoved = false;
    }
    applyMove(x, y) {
        const currentPlayer = this.game.getCurrentPlayer();
        this.display.fillHexagon(x, y, currentPlayer);
        this.game.placeToken(x, y);
        if (this.game.isWinner(currentPlayer)) this.makeWinner(currentPlayer);
        else this.game.switchPlayer();
        this.display.drawGameInfo();
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}


let $0ccd03270594991d$var$game = new (0, $959dbcec7d4dd44d$export$985739bfa5723e08)(11);
let $0ccd03270594991d$var$display = new (0, $014f4e9ab2325c0b$export$76748c987176663a)(4, $0ccd03270594991d$var$game);
function $0ccd03270594991d$var$startTwoPlayerGame() {
    $0ccd03270594991d$var$display.clearDisplay();
    $0ccd03270594991d$var$display.CANVAS.replaceWith($0ccd03270594991d$var$display.CANVAS.cloneNode(true));
    $0ccd03270594991d$var$game = new (0, $959dbcec7d4dd44d$export$985739bfa5723e08)(11);
    $0ccd03270594991d$var$display = new (0, $014f4e9ab2325c0b$export$76748c987176663a)(4, $0ccd03270594991d$var$game);
    $0ccd03270594991d$var$display.draw();
    $0ccd03270594991d$var$display.addInputHandling(new (0, $f2bd93d1bc05a04b$export$862991097cec0aa4)($0ccd03270594991d$var$display));
}
function $0ccd03270594991d$var$startAIGame() {
    $0ccd03270594991d$var$display.clearDisplay();
    $0ccd03270594991d$var$display.CANVAS.replaceWith($0ccd03270594991d$var$display.CANVAS.cloneNode(true));
    $0ccd03270594991d$var$game = new (0, $959dbcec7d4dd44d$export$985739bfa5723e08)(11);
    $0ccd03270594991d$var$display = new (0, $014f4e9ab2325c0b$export$76748c987176663a)(4, $0ccd03270594991d$var$game);
    $0ccd03270594991d$var$display.draw();
    const controller = new (0, $cec8df7c1a458b34$export$dd37bcc5a24d523f)($0ccd03270594991d$var$display);
    const selectedRadioButton = document.querySelector('input[name="player-start-color"]:checked');
    switch(selectedRadioButton.value){
        case "player-red":
            break;
        case "player-blue":
            setTimeout(controller.aiMove.bind(controller), 500);
            break;
        case "player-random-color":
            if (Math.random() < 0.5) setTimeout(controller.aiMove.bind(controller), 500);
            break;
        default:
            throw new Error("Unexpected value.");
    }
    $0ccd03270594991d$var$display.addInputHandling(controller);
}
// event handler for new game button
const $0ccd03270594991d$var$newGameButton = document.getElementById("new-game-button");
$0ccd03270594991d$var$newGameButton.onclick = ()=>{
    $0ccd03270594991d$var$newGameButton.classList.add("button-highlight");
    $0ccd03270594991d$var$newGameAIButton.classList.remove("button-highlight");
    $0ccd03270594991d$var$startTwoPlayerGame();
};
// event handler for new game with AI button
const $0ccd03270594991d$var$newGameAIButton = document.getElementById("new-game-ai-button");
$0ccd03270594991d$var$newGameAIButton.onclick = ()=>{
    $0ccd03270594991d$var$newGameAIButton.classList.add("button-highlight");
    $0ccd03270594991d$var$newGameButton.classList.remove("button-highlight");
    $0ccd03270594991d$var$startAIGame();
};
// start game
$0ccd03270594991d$var$startTwoPlayerGame();


//# sourceMappingURL=index.9cac830f.js.map
