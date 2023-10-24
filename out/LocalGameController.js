export class LocalGameController {
    constructor(display) {
        this.display = display;
        this.game = display.game;
        this.firstPlayerMoved = false;
    }
    applyMove(x, y) {
        const currentPlayer = this.game.getCurrentPlayer();
        this.display.fillHexagon(x, y, currentPlayer);
        this.game.placeToken(x, y);
        if (this.game.isWinner(currentPlayer)) {
            this.makeWinner(currentPlayer);
        }
        else {
            this.game.switchPlayer();
        }
    }
    makeWinner(currentPlayer) {
        this.game.setWinner(currentPlayer);
        this.display.disableInput();
        const winBridge = this.game.getWinBridge();
        this.display.highlightWinPath(winBridge);
    }
}
//# sourceMappingURL=LocalGameController.js.map