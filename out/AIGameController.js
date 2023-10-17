import { Token } from "./Token";
import { GameEvaluator } from "./GameEvaluator";
export class AIGameController {
    constructor(display) {
        this.display = display;
        this.game = display.game;
        this.evaluator = new GameEvaluator(this.game.board, 1);
        this.firstMovePlayed = false;
    }
    applyMove(x, y) {
        this.placeToken(x, y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.setWinner();
        }
        else {
            this.game.switchPlayer();
            if (this.firstMovePlayed) {
                setTimeout(this.aiMove.bind(this), 200);
            }
            else {
                this.firstMovePlayed = true;
                setTimeout(this.aiRandomMove.bind(this), 200);
            }
        }
    }
    aiMove() {
        const bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
        this.placeToken(bestMove.x, bestMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            console.log("AI wins!");
            this.setWinner();
        }
        else {
            this.game.switchPlayer();
        }
    }
    aiRandomMove() {
        console.log("called");
        let availableMoves = [];
        for (const node of this.game.board.playableNodes()) {
            if (node.getToken() === Token.EMPTY) {
                availableMoves.push(node);
            }
        }
        if (availableMoves.length === 0) {
            throw Error('No available moves');
        }
        const random = Math.floor(Math.random() * availableMoves.length);
        const randomMove = availableMoves[random];
        console.log(randomMove);
        this.placeToken(randomMove.x, randomMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            console.log("AI wins!");
            this.setWinner();
        }
        else {
            this.game.switchPlayer();
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