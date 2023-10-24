import { AIGameController } from "./AIGameController";
import { Display } from "./Display";
import { Game } from "./Game";
import { LocalGameController } from "./LocalGameController";

let game: Game = new Game(11);
let display: Display = new Display(4, game);

function startTwoPlayerGame() {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(11);
    display = new Display(4, game);
    display.draw();
    display.addInputHandling(new LocalGameController(display));
}

function startAIGame() {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(11);
    display = new Display(4, game);
    display.draw();
    const controller = new AIGameController(display);

    const selectedRadioButton: HTMLInputElement = document.querySelector('input[name="player-start-color"]:checked');
    switch (selectedRadioButton.value) {
        case "player-red":
            // do nothing
            break;
        case "player-blue":
            setTimeout(controller.aiMove.bind(controller), 500);
            break;
        case "player-random-color":
            if (Math.random() < 0.5) {
                setTimeout(controller.aiMove.bind(controller), 500);
            }
            break;
        default:
            throw new Error("Unexpected value.");
    }
    display.addInputHandling(controller);
}

// event handler for new game button
const newGameButton = document.getElementById("new-game-button");
newGameButton.onclick = startTwoPlayerGame;

// event handler for new game with AI button
const newGameAIButton = document.getElementById("new-game-ai-button");
newGameAIButton.onclick = startAIGame;

// start game
startTwoPlayerGame();
