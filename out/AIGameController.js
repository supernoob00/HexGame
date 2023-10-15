import { GameEvaluator } from "./GameEvaluator";
export class AIGameController {
    constructor(display) {
        this.display = display;
        this.game = display.game;
        this.evaluator = new GameEvaluator(this.game.board, 1);
    }
    applyMove(x, y) {
        this.placeToken(x, y);
        console.log(this.game.getCurrentPlayer());
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.setWinner();
        }
        else {
            this.game.switchPlayer();
            const bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
            this.placeToken(bestMove.row, bestMove.col);
            if (this.game.isWinner(this.game.getCurrentPlayer())) {
                console.log("AI wins!");
                this.setWinner();
            }
            else {
                this.game.switchPlayer();
            }
        }
    }
    placeToken(x, y) {
        this.display.fillHexagon(x, y, this.game.getCurrentPlayer());
        this.game.placeToken(x, y);
    }
    setWinner() {
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
//# sourceMappingURL=AIGameController.js.map