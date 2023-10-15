import { Token } from "./Token";
import { Game } from "./Game";
import { Display } from "./Display";
import { Controller } from "./Controller";
import { GameEvaluator } from "./GameEvaluator";

export class AIGameController implements Controller {
    private display: Display;
    private game: Game;
    private evaluator: GameEvaluator;
    private token: Token;

    constructor(display: Display) {
        this.display = display;
        this.game = display.game;
        this.evaluator = new GameEvaluator(this.game.board, 1);
    }

    applyMove(x: number, y: number) {
        this.placeToken(x, y);
        console.log(this.game.getCurrentPlayer());

        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.setWinner();
        } else {
            this.game.switchPlayer();
            const bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
            this.placeToken(bestMove.row, bestMove.col);

            if (this.game.isWinner(this.game.getCurrentPlayer())) {
                console.log("AI wins!");
                this.setWinner();
            } else {
                this.game.switchPlayer();
            }
        }
    }

    private placeToken(x: number, y: number) {
        this.display.fillHexagon(x, y, this.game.getCurrentPlayer());
        this.game.placeToken(x, y);
    }

    private setWinner() {
        console.log("winner!");
            this.game.setWinner(this.game.getCurrentPlayer());
            this.display.disableInput();
            const winBridge = this.game.getWinBridge();
            //this.display.drawTrail(
            //    winBridge.map(node => [node.x, node.y]).slice(1, -1));
            console.log(winBridge);
            console.log(this.game.getWinner() + " won!");
    }
}