import { Controller } from "./Controller";
import { Display } from "./Display";
import { Game } from "./Game";
import { Token } from "./Token";

export class LocalGameController implements Controller {
    private display: Display;
    private game: Game;
    private firstPlayerMoved: boolean;

    constructor(display: Display) {
        this.display = display;
        this.game = display.game;
        this.firstPlayerMoved = false;
    }

    applyMove(x: number, y: number) {
        const currentPlayer = this.game.getCurrentPlayer();
        this.display.fillHexagon(x, y, currentPlayer);
        this.game.placeToken(x, y);

        if (this.game.isWinner(currentPlayer)) {
            this.makeWinner(currentPlayer);
        } else {
            this.game.switchPlayer();
        }
        this.display.drawGameInfo();
    }

    makeWinner(currentPlayer: Token.RED | Token.BLUE): void {
            this.game.setWinner(currentPlayer);
            this.display.disableInput();
            const winBridge = this.game.getWinBridge();
            this.display.highlightWinPath(winBridge);
    }
}