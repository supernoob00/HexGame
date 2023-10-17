"use strict";
var _a;
import { Token } from "./Token";
export class Display {
    constructor(gap, game) {
        this.CANVAS = document.getElementById("game-canvas");
        this.CTX = this.CANVAS.getContext("2d");
        this.CANVAS_HEIGHT = this.CANVAS.clientHeight;
        this.CANVAS_WIDTH = this.CANVAS.clientWidth;
        this.CANVAS_ORIGIN_X = this.CANVAS.offsetLeft + this.CANVAS.clientLeft;
        this.CANVAS_ORIGIN_Y = this.CANVAS.offsetTop + this.CANVAS.clientTop;
        this.gap = gap;
        this.game = game;
        this.sideCount = game.board.size;
        this.hexRadius = (this.CANVAS_HEIGHT / this.sideCount) * 0.5;
        this.hexFlatToFlat = this.hexRadius * Math.sqrt(3);
        this.bottomOffset = this.hexFlatToFlat / 2 * this.sideCount;
        this.totalGapLength = gap * (this.sideCount + 1);
        this.hexPaths2D = this.createHexPaths2D(_a.GRID_ORIGIN_X, _a.GRID_ORIGIN_Y);
        this.inputActive = true;
        this.activeHoverNode = null;
    }
    /**
     * Draws a grid of hexagons to the canvas.
     */
    drawHexagons() {
        this.CTX.strokeStyle = "black";
        this.CTX.fillStyle = _a.EMPTY_TILE_COLOR;
        for (const row of this.hexPaths2D) {
            for (const path of row) {
                this.CTX.stroke(path);
                this.CTX.fill(path);
            }
        }
    }
    drawBorder() {
        // draw red border
        this.CTX.fillStyle = _a.RED_COLOR_VALUE;
    }
    drawText() {
        this.CTX.font = _a.FONT;
        this.CTX.fillStyle = _a.FONT_COLOR;
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
        const coordOriginX = _a.CANVAS_HRZ_BORDER + this.bottomOffset + this.gap * 3;
        const coordOriginY = _a.CANVAS_VERT_BORDER + (this.hexFlatToFlat / 2 * Math.sqrt(3) + this.gap) * this.sideCount;
        // draw column letters
        for (let i = 0; i < this.sideCount; i++) {
            this.CTX.fillText(letters[i], coordOriginX + (this.hexFlatToFlat + this.gap) * i, coordOriginY);
        }
        // draw row numbers
        for (let j = 0; j < this.sideCount; j++) {
            const numText = (j + 1).toString();
            const numTextWidth = this.CTX.measureText(numText).width;
            this.CTX.fillText(numText, (30 - numTextWidth) + (this.gap / 2 + this.hexFlatToFlat / 2) * j, _a.CANVAS_VERT_BORDER + 2 + this.gap + (this.gap + this.hexFlatToFlat / 2 * Math.sqrt(3)) * j);
        }
    }
    /**
     * Draws current game state to canvas.
     */
    draw() {
        this.drawHexagons();
        this.drawText();
    }
    /**
     * Fills hexagon at (x, y) position with given color, representing a token placed.
     *
     * @param x the x-position of the hexagon to fill
     * @param y the y-position of the hexagon to fill
     * @param token the token color used to fill the hexagon
     */
    fillHexagon(x, y, token) {
        const path2D = this.hexPaths2D[x][y];
        if (token === Token.RED) {
            this.CTX.fillStyle = _a.RED_COLOR_VALUE;
        }
        else {
            this.CTX.fillStyle = _a.BLUE_COLOR_VALUE;
        }
        this.CTX.fill(path2D);
    }
    drawTrail(nodes) {
        this.CTX.fillStyle = _a.TRAIL_COLOR_VALUE;
        const r = 1;
        // TODO: clean up derived values
        const rowOffset = this.hexFlatToFlat / 2 * Math.sqrt(3);
        for (const node of nodes) {
            const path2d = this.hexPaths2D[node.x][node.y];
            this.CTX.fillStyle = _a.TRAIL_COLOR_VALUE;
            this.CTX.fill(path2d);
        }
    }
    /**
     * Creates a hexagon Path2D object with the given location and size.
     *
     * @param centerX the center x-coordinate of hexagon
     * @param centerY the center y-coordinate of hexagon
     * @param r the radius of the hexagon, which also equals its side length
     * @returns the hexagon Path2D object
     */
    hexPath2D(centerX, centerY, r) {
        let x = centerX;
        let y = centerY - r;
        const path = new Path2D();
        path.moveTo(x, y);
        for (let i = 0; i < _a.HEXAGON_SIDE_COUNT; i++) {
            x += r * Math.cos(_a.HEXAGON_INTERIOR_ANGLE / 2 + i * _a.HEXAGON_INTERIOR_ANGLE);
            y += r * Math.sin(_a.HEXAGON_INTERIOR_ANGLE / 2 + i * _a.HEXAGON_INTERIOR_ANGLE);
            path.lineTo(x, y);
        }
        return path;
    }
    /**
     * Creates an array of Path2D objects representing the game board.
     *
     * @param startCenterX the center x-coordinate of the top left hexagon within the grid
     * @param startCenterY the center y-coordinate of the top left hexagon within the grid
     * @returns an array of Path2D objects representing the hexagon tiles
     */
    createHexPaths2D(startCenterX, startCenterY) {
        const hexPaths2D = [];
        for (let i = 0; i < this.sideCount; i++) {
            hexPaths2D.push([]);
        }
        // TODO: clean up all derived values
        const rowOffset = this.hexFlatToFlat / 2 * Math.sqrt(3);
        let currentX = startCenterX;
        let currentY = startCenterY;
        for (let i = 0; i < this.sideCount; i++) {
            currentX = startCenterX + (this.hexFlatToFlat / 2 + this.gap / 2) * i;
            for (let j = 0; j < this.sideCount; j++) {
                hexPaths2D[i].push(this.hexPath2D(currentX, currentY, this.hexRadius));
                currentX = currentX + this.gap + this.hexFlatToFlat;
            }
            currentY = currentY + this.gap + rowOffset;
        }
        return hexPaths2D;
    }
    clearDisplay() {
        this.CTX.fillStyle = "white";
        this.CTX.fillRect(this.CANVAS_ORIGIN_X, this.CANVAS_ORIGIN_Y, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }
    disableInput() {
        this.inputActive = false;
    }
    enableInput() {
        this.inputActive = true;
    }
    /**
     * Adds input handling to this.
     * @param controller
     */
    addInputHandling(controller) {
        // add click events to tiles
        this.CANVAS.addEventListener("click", (event) => {
            if (!this.inputActive) {
                return;
            }
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            for (let i = 0; i < this.sideCount; i++) {
                for (let j = 0; j < this.sideCount; j++) {
                    const path = this.hexPaths2D[i][j];
                    if (this.CTX.isPointInPath(path, x, y)
                        && this.game.getToken(i, j) === Token.EMPTY) {
                        this.activeHoverNode = null;
                        controller.applyMove(i, j);
                        return;
                    }
                }
            }
        });
        // TODO: wrong hover color when playing AI after turn change
        this.CANVAS.addEventListener("mousemove", (event) => {
            const x = event.pageX - this.CANVAS_ORIGIN_X;
            const y = event.pageY - this.CANVAS_ORIGIN_Y;
            const tokenToPlace = this.game.getCurrentPlayer();
            const color = tokenToPlace ===
                Token.RED ? _a.RED_HOVER_COLOR : _a.BLUE_HOVER_COLOR;
            const oldHoverNode = this.activeHoverNode;
            for (let i = 0; i < this.sideCount; i++) {
                for (let j = 0; j < this.sideCount; j++) {
                    const path = this.hexPaths2D[i][j];
                    if (this.CTX.isPointInPath(path, x, y)
                        && this.game.getToken(i, j) === Token.EMPTY) {
                        if (path === this.activeHoverNode) {
                            this.CTX.fillStyle = _a.EMPTY_TILE_COLOR;
                            this.CTX.fill(path);
                            this.CTX.fillStyle = color;
                            this.CTX.fill(path);
                        }
                        else {
                            if (this.activeHoverNode !== null) {
                                this.CTX.fillStyle = _a.EMPTY_TILE_COLOR;
                                this.CTX.stroke(this.activeHoverNode);
                                this.CTX.fill(this.activeHoverNode);
                            }
                            this.CTX.fill(path);
                            this.activeHoverNode = path;
                        }
                        return;
                    }
                }
            }
            if (this.activeHoverNode !== null) {
                this.CTX.fillStyle = _a.EMPTY_TILE_COLOR;
                this.CTX.stroke(this.activeHoverNode);
                this.CTX.fill(this.activeHoverNode);
                this.activeHoverNode = null;
            }
        });
        // cursor changes to pointer when hovering over canvas
        this.CANVAS.addEventListener("mouseenter", () => {
            document.body.style.cursor = "pointer";
        });
        // cursor reverts to default when leaving canvas
        this.CANVAS.addEventListener("mouseleave", () => {
            document.body.style.cursor = "default";
        });
    }
}
_a = Display;
// border widths around game board
Display.CANVAS_HRZ_BORDER = 60;
Display.CANVAS_VERT_BORDER = 50;
Display.HEXAGON_SIDE_COUNT = 6;
Display.HEXAGON_INTERIOR_ANGLE = Math.PI / 3;
Display.FONT = "bold 16px sans-serif";
Display.FONT_COLOR = "black";
Display.RED_COLOR_VALUE = "red";
Display.BLUE_COLOR_VALUE = "blue";
Display.RED_HOVER_COLOR = "rgba(200, 0, 0, 0.3)";
Display.BLUE_HOVER_COLOR = "rgba(0, 0, 200, 0.3)";
Display.TRAIL_COLOR_VALUE = "yellow";
Display.EMPTY_TILE_COLOR = "lightgrey";
Display.GRID_ORIGIN_X = _a.CANVAS_HRZ_BORDER;
Display.GRID_ORIGIN_Y = _a.CANVAS_VERT_BORDER;
//# sourceMappingURL=Display.js.map