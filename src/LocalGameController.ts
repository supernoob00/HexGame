import { Controller } from "./Controller";
import { Display } from "./Display";
import { Game } from "./Game";
import { Token } from "./Token";

export class LocalGameController implements Controller {
    private display: Display;
    private game: Game;

    constructor(display: Display) {
        this.display = display;
        this.game = display.game;
    }

    applyMove(x: number, y: number) {
        const currentPlayer = this.game.getCurrentPlayer();
        this.display.fillHexagon(x, y, currentPlayer);
        this.game.placeToken(x, y);

        if (this.game.isWinner(currentPlayer)) {
            console.log("winner!");
            this.game.setWinner(currentPlayer);
            this.display.disableInput();
            const winBridge = this.game.getWinBridge();
            //this.display.drawTrail(
            //    winBridge.map(node => [node.x, node.y]).slice(1, -1));
            console.log(winBridge);
            console.log(this.game.getWinner() + " won!");
        } else {
            this.game.switchPlayer();
        }
    }
}