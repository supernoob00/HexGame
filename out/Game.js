import { Token } from "./Token";
import { Board } from "./Board";
export class Game {
    constructor(boardSize) {
        this.board = new Board(boardSize);
        this.currentPlayer = Token.RED;
        this.winner = null;
    }
    getToken(x, y) {
        return this.board.getToken(x, y);
    }
    placeToken(x, y) {
        this.board.putToken(x, y, this.currentPlayer);
    }
    playTurn(x, y) {
        if (this.isGameOver()) {
            throw Error("Game has already ended.");
        }
        this.board.putToken(x, y, this.currentPlayer);
        if (this.isWinner(this.currentPlayer)) {
            this.winner = this.currentPlayer;
        }
        else {
            this.switchPlayer();
        }
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    isGameOver() {
        return this.winner !== null;
    }
    getWinner() {
        if (this.winner === null) {
            throw Error("Game is not over");
        }
        return this.winner;
    }
    setWinner(token) {
        if (this.isGameOver()) {
            throw new Error("Game is already over.");
        }
        this.winner = token;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === Token.RED ? Token.BLUE : Token.RED;
    }
    isWinner(token) {
        if (token === Token.RED) {
            return this.board.connected(this.board.topVirtualNode, this.board.bottomVirtualNode, token);
        }
        return this.board.connected(this.board.leftVirtualNode, this.board.rightVirtualNode, token);
    }
    getWinBridge() {
        if (!this.isGameOver()) {
            throw Error("Game is not over.");
        }
        if (this.getWinner() === Token.RED) {
            return this.board.BFS(this.board.topVirtualNode, this.board.bottomVirtualNode, Token.RED);
        }
        else {
            return this.board.BFS(this.board.leftVirtualNode, this.board.rightVirtualNode, Token.BLUE);
        }
    }
}
//# sourceMappingURL=Game.js.map