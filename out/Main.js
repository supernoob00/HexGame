import { AIGameController } from "./AIGameController";
import { Display } from "./Display";
import { Game } from "./Game";
import { LocalGameController } from "./LocalGameController";
// create canvas element
let CANVAS = document.getElementById("game-canvas");
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
    game = new Game(11);
    display = new Display(4, game);
    display.draw();
    display.addInputHandling(new LocalGameController(display));
};
const newGameAIButton = document.createElement("button");
newGameAIButton.textContent = "AI Game";
newGameAIButton.id = "new-game-ai-button";
document.body.appendChild(newGameAIButton);
newGameAIButton.onclick = () => {
    display.clearDisplay();
    display.CANVAS.replaceWith(display.CANVAS.cloneNode(true));
    game = new Game(11);
    console.log(game.board);
    display = new Display(4, game);
    console.log(display.game.board);
    display.draw();
    display.addInputHandling(new AIGameController(display));
};
// start game
let game = new Game(11);
let display = new Display(4, game);
let handler = new LocalGameController(display);
display.draw();
display.addInputHandling(handler);
console.log(game.board.nodes);
//# sourceMappingURL=Main.js.map