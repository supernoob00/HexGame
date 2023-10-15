import { Token } from "./Token";
import { Board } from "./Board";
import { HexNode } from "./HexNode";

export class Game {
    board: Board; // TODO: make private

    private currentPlayer: Token.RED | Token.BLUE;
    private winner: Token.RED | Token.BLUE | null;

    constructor(boardSize: number) {
        this.board = new Board(boardSize);
        this.currentPlayer = Token.RED;
        this.winner = null;
    }

    getToken(x: number, y: number): Token {
        return this.board.getToken(x, y);
    }

    placeToken(x: number, y: number): void {
        this.board.putToken(x, y, this.currentPlayer);
    }

    playTurn(x: number, y: number): void {
        if (this.isGameOver()) {
            throw Error("Game has already ended.");
        }
        this.board.putToken(x, y, this.currentPlayer);
        if (this.isWinner(this.currentPlayer)) {
            this.winner = this.currentPlayer;
        } else {
            this.switchPlayer();
        }
    }

    getCurrentPlayer(): Token.RED | Token.BLUE {
        return this.currentPlayer;
    }

    isGameOver(): boolean {
        return this.winner !== null;
    }

    getWinner(): Token.RED | Token.BLUE {
        if (this.winner === null) {
            throw Error("Game is not over");
        }
        return this.winner;
    }

    setWinner(token: Token.RED | Token.BLUE): void {
        if (this.isGameOver()) {
            throw new Error("Game is already over.");
        }
        this.winner = token;
    }

    switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === Token.RED ? Token.BLUE : Token.RED;
    }

    isWinner(token: Token.RED | Token.BLUE): boolean {
        if (token === Token.RED) {
            return this.board.connected(
                this.board.topVirtualNode,
                this.board.bottomVirtualNode,
                token
            );
        } 
        return this.board.connected(
            this.board.leftVirtualNode,
            this.board.rightVirtualNode,
            token 
        );
    }

    getWinBridge(): HexNode[] {
        if (!this.isGameOver()) {
            throw Error("Game is not over.");
        }
        if (this.getWinner() === Token.RED) {
            return this.board.BFS(
                this.board.topVirtualNode,
                this.board.bottomVirtualNode,
                Token.RED
            );
        } else {
            return this.board.BFS(
                this.board.leftVirtualNode,
                this.board.rightVirtualNode,
                Token.BLUE
            );
        }
    }
}