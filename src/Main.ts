import { AIGameController } from "./AIGameController";
import { Controller } from "./Controller";
import { Display } from "./Display";
import { Game } from "./Game";
import { LocalGameController } from "./LocalGameController";

// create canvas element
let CANVAS = document.getElementById("game-canvas") as HTMLCanvasElement;
// CANVAS.id = "game-canvas";
// CANVAS.width = 600;
// CANVAS.height = 600;
// document.body.appendChild(CANVAS);

// create non-board UI elements
const newGameButton = document.getElementById("new-game-button");

newGameButton.onclick = () => {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(11);
    display = new Display(4, game);
    display.draw();
    display.addInputHandling(new LocalGameController(display));
};

const newGameAIButton = document.getElementById("new-game-ai-button");

newGameAIButton.onclick = () => {
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
            console.log("ai is red");
            controller.aiMove();
            break;
        case "player-random-color":
            console.log("random");
            if (Math.random() < 0.5) {
                // TODO: add timeout
                controller.aiMove();
            }
            break;
        default:
            throw new Error("Unexpected value.");
    }

    display.addInputHandling(controller);
}

// start game
let game = new Game(11);
let display = new Display(4, game);
let handler = new LocalGameController(display);
display.draw();
display.addInputHandling(handler);
console.log(game.board.nodes);
