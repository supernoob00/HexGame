import { Controller } from "./Controller";
import { Display } from "./Display";
import { Game } from "./Game";

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
            console.log("Winner!");
            this.game.setWinner(currentPlayer);
            this.display.disableInput();
            const winBridge = this.game.getWinBridge();
            this.display.drawTrail(winBridge);
            console.log(this.game.getWinner() + " won!");
        } else {
            this.game.switchPlayer();
        }
    }
}