import { AIGameController } from "./AIGameController";
import { Controller } from "./Controller";
import { Display } from "./Display";
import { Game } from "./Game";
import { LocalGameController } from "./LocalGameController";

// create canvas element
let CANVAS = document.getElementById("game-canvas") as HTMLCanvasElement;
CANVAS.getContext("2d").translate(0.5, 0.5);
// CANVAS.id = "game-canvas";
// CANVAS.width = 600;
// CANVAS.height = 600;
// document.body.appendChild(CANVAS);

// create non-board UI elements
const newGameButton = document.createElement("button");
newGameButton.textContent = "New Game";
newGameButton.id = "new-game-button";
document.body.appendChild(newGameButton);

newGameButton.onclick = () => {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(6);
    display = new Display(4, game);
    display.drawHexagons();
    display.addInputHandling(new LocalGameController(display));
};


const newGameAIButton = document.createElement("button");
newGameAIButton.textContent = "AI Game";
newGameAIButton.id = "new-game-ai-button";
document.body.appendChild(newGameAIButton);

newGameAIButton.onclick = () => {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(6);
    display = new Display(4, game);
    display.drawHexagons();
    display.addInputHandling(new AIGameController(display));
}

// start game
let game = new Game(6);
let display = new Display(4, game);
let handler = new LocalGameController(display);
display.drawHexagons();
display.addInputHandling(handler);
console.log(game.board.nodes);
