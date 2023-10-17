"use strict";

import { Token } from "./Token";
import { Controller } from "./Controller";
import { DrawUtil } from "./DrawUtil";
import { Game } from "./Game";
import { HexNode } from "./HexNode";

export class Display {
    readonly CANVAS = document.getElementById("game-canvas") as HTMLCanvasElement;
    readonly CTX = this.CANVAS.getContext("2d");
    readonly CANVAS_HEIGHT = this.CANVAS.clientHeight;
    readonly CANVAS_WIDTH = this.CANVAS.clientWidth;
    readonly CANVAS_ORIGIN_X = this.CANVAS.offsetLeft + this.CANVAS.clientLeft;
    readonly CANVAS_ORIGIN_Y = this.CANVAS.offsetTop + this.CANVAS.clientTop;

    // border widths around game board
    static readonly CANVAS_HRZ_BORDER = 60;
    static readonly CANVAS_VERT_BORDER = 50;

    static readonly HEXAGON_SIDE_COUNT = 6;
    static readonly HEXAGON_INTERIOR_ANGLE = Math.PI / 3;

    static readonly FONT = "bold 16px sans-serif";
    static readonly FONT_COLOR = "black";

    static readonly RED_COLOR_VALUE = "red";
    static readonly BLUE_COLOR_VALUE = "blue";
    static readonly RED_HOVER_COLOR = "rgba(200, 0, 0, 0.3)";
    static readonly BLUE_HOVER_COLOR = "rgba(0, 0, 200, 0.3)";
    static readonly TRAIL_COLOR_VALUE = "yellow";
    static readonly EMPTY_TILE_COLOR = "lightgrey";

    static readonly GRID_ORIGIN_X = this.CANVAS_HRZ_BORDER;
    static readonly GRID_ORIGIN_Y = this.CANVAS_VERT_BORDER;

    readonly gap: number;
    readonly sideCount: number;

    // computed radius of hexagon tiles from board size and gap length;
    // found by solving the following algebraic equation for hexRadius: 
    // CLIENT_WIDTH = hexRowLength + bottomOffset + totalGapLength
    readonly hexRadius: number;
    // hexagon flat-to-flat distance
    readonly hexFlatToFlat: number;
    readonly bottomOffset: number;
    readonly totalGapLength: number;

    // an array of Path2D hexagon objects
    private readonly hexPaths2D: Path2D[][];

    public inputActive: boolean;

    private activeHoverNode: Path2D | null;

    // view can access the game object to get information about it, but should not 
    // modify it in any way -- that's the responsibility of the controller
    readonly game: Game;

    constructor(gap: number, game: Game) {
        this.gap = gap;
        this.game = game;
        this.sideCount = game.board.size;

        this.hexRadius = (this.CANVAS_HEIGHT / this.sideCount) * 0.5;
        this.hexFlatToFlat = this.hexRadius * Math.sqrt(3);
        this.bottomOffset = this.hexFlatToFlat / 2 * this.sideCount;
        this.totalGapLength = gap * (this.sideCount + 1);

        this.hexPaths2D = this.createHexPaths2D(Display.GRID_ORIGIN_X, Display.GRID_ORIGIN_Y);
        this.inputActive = true;
        this.activeHoverNode = null;
    }

    /**
     * Draws a grid of hexagons to the canvas.
     */
    private drawHexagons(): void {
        this.CTX.strokeStyle = "black";
        this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
        for (const row of this.hexPaths2D) {
            for (const path of row) {
                this.CTX.stroke(path);
                this.CTX.fill(path);
            }
        }
    }

    drawBorder(): void {
        // draw red border
        this.CTX.fillStyle = Display.RED_COLOR_VALUE;
    }

    private drawText(): void {
        this.CTX.font = Display.FONT;
        this.CTX.fillStyle = Display.FONT_COLOR;

        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
        const coordOriginX = Display.CANVAS_HRZ_BORDER + this.bottomOffset + this.gap * 3;
        const coordOriginY = Display.CANVAS_VERT_BORDER + (this.hexFlatToFlat / 2 * Math.sqrt(3) + this.gap) * this.sideCount;

        // draw column letters
        for (let i = 0; i < this.sideCount; i++) {
            this.CTX.fillText(
                letters[i], 
                coordOriginX + (this.hexFlatToFlat + this.gap) * i,
                coordOriginY);
        }
        // draw row numbers
        for (let j = 0; j < this.sideCount; j++) {
            const numText = (j + 1).toString();
            const numTextWidth = this.CTX.measureText(numText).width;
            this.CTX.fillText(
                numText,
                (30 - numTextWidth) + (this.gap / 2 + this.hexFlatToFlat / 2) * j,
                Display.CANVAS_VERT_BORDER + 2 + this.gap + (this.gap + this.hexFlatToFlat / 2 * Math.sqrt(3)) * j
            );
        }

    }

    /**
     * Draws current game state to canvas.
     */
    draw(): void {
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
    fillHexagon(x: number, y: number, token: Token.RED | Token.BLUE): void {
        const path2D = this.hexPaths2D[x][y];
        if (token === Token.RED) {
            this.CTX.fillStyle = Display.RED_COLOR_VALUE;
        } else {
            this.CTX.fillStyle = Display.BLUE_COLOR_VALUE;
        }
        this.CTX.fill(path2D);
    }

    drawTrail(nodes: HexNode[]) {
        this.CTX.fillStyle = Display.TRAIL_COLOR_VALUE;
        const r = 1;
        // TODO: clean up derived values
        const rowOffset = this.hexFlatToFlat / 2 * Math.sqrt(3);

        for (const node of nodes) {
            const path2d = this.hexPaths2D[node.x][node.y];
            this.CTX.fillStyle = Display.TRAIL_COLOR_VALUE;
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
    private hexPath2D(centerX: number, centerY: number, r: number): Path2D {
        let x = centerX;
        let y = centerY - r;
        const path = new Path2D();
        path.moveTo(x, y);

        for (let i = 0; i < Display.HEXAGON_SIDE_COUNT; i++) {
            x += r * Math.cos(Display.HEXAGON_INTERIOR_ANGLE / 2 + i * Display.HEXAGON_INTERIOR_ANGLE);
            y += r * Math.sin(Display.HEXAGON_INTERIOR_ANGLE / 2 + i * Display.HEXAGON_INTERIOR_ANGLE);
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
    private createHexPaths2D(startCenterX: number, startCenterY: number): Path2D[][] {
        const hexPaths2D: Path2D[][] = [];
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

    clearDisplay(): void {
        this.CTX.fillStyle = "white";
        this.CTX.fillRect(
            this.CANVAS_ORIGIN_X, 
            this.CANVAS_ORIGIN_Y,
            this.CANVAS_WIDTH,
            this.CANVAS_HEIGHT);
    }

    disableInput(): void {
        this.inputActive = false;
    }

    enableInput(): void {
        this.inputActive = true;
    }

    /**
     * Adds input handling to this.
     * @param controller 
     */
    addInputHandling(controller: Controller): void {
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
                Token.RED ? Display.RED_HOVER_COLOR : Display.BLUE_HOVER_COLOR;

            const oldHoverNode = this.activeHoverNode;
            for (let i = 0; i < this.sideCount; i++) {
                for (let j = 0; j < this.sideCount; j++) {
                    const path = this.hexPaths2D[i][j];

                    if (this.CTX.isPointInPath(path, x, y) 
                            && this.game.getToken(i, j) === Token.EMPTY) {
                        if (path === this.activeHoverNode) {
                            this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
                            this.CTX.fill(path);
                            this.CTX.fillStyle = color;
                            this.CTX.fill(path);
                        } else {
                            if (this.activeHoverNode !== null) {
                                this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
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
                this.CTX.fillStyle = Display.EMPTY_TILE_COLOR;
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