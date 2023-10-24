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
            this.makeWinner(this.game.getCurrentPlayer());
        }
        else {
            this.game.switchPlayer();
            if (this.firstMovePlayed) {
                setTimeout(this.aiMove.bind(this), 200);
            }
            else {
                setTimeout(this.aiRandomMove.bind(this), 200);
            }
        }
    }
    aiMove() {
        this.display.drawHourglass();
        let bestMove;
        if (this.firstMovePlayed) {
            bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
        }
        else if (this.game.getCurrentPlayer() === Token.RED) {
            bestMove = this.evaluator.chooseOpeningRedMove();
        }
        this.placeToken(bestMove.x, bestMove.y);
        this.display.clearHourglass();
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.makeWinner(this.game.getCurrentPlayer());
        }
        else {
            this.game.switchPlayer();
        }
    }
    aiRandomMove() {
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
        this.placeToken(randomMove.x, randomMove.y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.makeWinner(this.game.getCurrentPlayer());
        }
        else {
            this.game.switchPlayer();
        }
    }
    placeToken(x, y) {
        this.firstMovePlayed = true;
        this.display.fillHexagon(x, y, this.game.getCurrentPlayer());
        this.game.placeToken(x, y);
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}
//# sourceMappingURL=AIGameController.js.map