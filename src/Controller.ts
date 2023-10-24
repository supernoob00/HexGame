import { Token } from "./Token";

export interface Controller {
    applyMove(x: number, y: number): void;

    makeWinner(currentPlayer: Token.RED | Token.BLUE): void;
}