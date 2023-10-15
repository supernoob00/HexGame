import { Token } from "./Token";

export class Move {
    public readonly row: number;
    public readonly col: number;
    public readonly player: Token.RED | Token.BLUE;

    constructor(row: number, col: number, player: Token.RED | Token.BLUE) {
        this.row = row;
        this.col = col;
        this.player = player;
    }
}