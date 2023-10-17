import { Token } from "./Token";
import { Game } from "./Game";
import { Display } from "./Display";
import { Controller } from "./Controller";
import { GameEvaluator } from "./GameEvaluator";
import { HexNode } from "./HexNode";

export class AIGameController implements Controller {
    private display: Display;
    private game: Game;
    private evaluator: GameEvaluator;
    private firstMovePlayed: boolean;

    constructor(display: Display) {
        this.display = display;
        this.game = display.game;
        this.evaluator = new GameEvaluator(this.game.board, 1);
        this.firstMovePlayed = false;
    }

    applyMove(x: number, y: number) {
        this.placeToken(x, y);
        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            this.setWinner();
        } else {
            this.game.switchPlayer();

            if (this.firstMovePlayed) {
                setTimeout(this.aiMove.bind(this), 200);
            } else {
                this.firstMovePlayed = true;
                setTimeout(this.aiRandomMove.bind(this), 200);
            }
        }
    }

    private aiMove(): void {
        const bestMove = this.evaluator.chooseBestMove(this.game.getCurrentPlayer());
        this.placeToken(bestMove.x, bestMove.y);

        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            console.log("AI wins!");
            this.setWinner();
        } else {
            this.game.switchPlayer();
        }
    }

    private aiRandomMove(): void {
        console.log("called");
        let availableMoves: HexNode[] = [];
        for (const node of this.game.board.playableNodes()) {
            if (node.getToken() === Token.EMPTY) {
                availableMoves.push(node);
            }
        }
        if (availableMoves.length === 0) {
            throw Error('No available moves');
        }
        const random = Math.floor (Math.random() * availableMoves.length);
        const randomMove = availableMoves[random];
        console.log(randomMove);
        this.placeToken(randomMove.x, randomMove.y);

        if (this.game.isWinner(this.game.getCurrentPlayer())) {
            console.log("AI wins!");
            this.setWinner();
        } else {
            this.game.switchPlayer();
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