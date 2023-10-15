export class LocalGameController {
    constructor(display) {
        this.display = display;
        this.game = display.game;
    }
    applyMove(x, y) {
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
        }
        else {
            this.game.switchPlayer();
        }
    }
}
//# sourceMappingURL=LocalGameController.js.map