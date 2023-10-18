import { MinPriorityQueue } from "../node_modules/@datastructures-js/priority-queue/index";
import { Board } from "./Board";
import { Game } from "./Game";
import { HexNode } from "./HexNode";
import { Deque } from "./Deque";
import { Token } from "./Token";
import {  } from "module";

export class GameEvaluator {
    static readonly MINIMAX_MAX_VAL = 1000;
    static readonly MINIMAX_MIN_VAL = -1000;
    static readonly MAXIMIZER_TOKEN = Token.RED;
    static readonly MINIMIZER_TOKEN = Token.BLUE;

    static readonly openingMoves: HexNode[] = [
        Board.Board11x11.getNode(1, 2),
        Board.Board11x11.getNode(3, 0),
        Board.Board11x11.getNode(5, 0),
        Board.Board11x11.getNode(6, 0),
        Board.Board11x11.getNode(7, 0),
        Board.Board11x11.getNode(8, 0),
        Board.Board11x11.getNode(9, 0),
        Board.Board11x11.getNode(10, 0),
        Board.Board11x11.getNode(2, 5),
        Board.Board11x11.getNode(9, 2),
        Board.Board11x11.getNode(8, 5),
        Board.Board11x11.getNode(1, 8),
        Board.Board11x11.getNode(0, 10),
        Board.Board11x11.getNode(2, 10),
        Board.Board11x11.getNode(3, 10),
        Board.Board11x11.getNode(5, 10),
        Board.Board11x11.getNode(6, 10),
        Board.Board11x11.getNode(7, 10),
        Board.Board11x11.getNode(8, 10)
    ];
    
    private board: Board;
    private searchDepth: number;

    constructor(board: Board, searchDepth: number) {
        this.board = board;
        this.searchDepth = searchDepth;
    }

    chooseBestMove(tokenToPlace: Token.RED | Token.BLUE): HexNode {
        if (tokenToPlace === Token.RED) {
            return this.chooseBestMoveAsMaximizer();
        }
        return this.chooseBestMoveAsMinimizer();
    }

    chooseOpeningRedMove(): HexNode {
        const rand = Math.floor(Math.random() * GameEvaluator.openingMoves.length);
        return GameEvaluator.openingMoves[rand];
    }

    private chooseBestMoveAsMaximizer(): HexNode {
        let max = GameEvaluator.MINIMAX_MIN_VAL - 1;
        let bestMove: HexNode;

        for (const node of this.board.playableNodes()) {
            if (node.getToken() === Token.EMPTY) {
                node.setToken(GameEvaluator.MAXIMIZER_TOKEN);
                const evalResult = this.minimax(this.searchDepth, false);
                node.setToken(Token.EMPTY);

                if (evalResult > max) {
                    max = evalResult;
                    bestMove = node;
                }
            }
        }
        return bestMove;
    }

    private chooseBestMoveAsMinimizer(): HexNode {
        let min = GameEvaluator.MINIMAX_MAX_VAL + 1;
        let bestMove: HexNode;

        for (const node of this.board.playableNodes()) {
            if (node.getToken() === Token.EMPTY) {
                node.setToken(GameEvaluator.MINIMIZER_TOKEN);
                const evalResult = this.minimax(this.searchDepth, true);
                node.setToken(Token.EMPTY);

                if (evalResult < min) {
                    min = evalResult;
                    bestMove = node;
                }
            }
        }
        return bestMove;
    }
 
    private evaluate(): number {
        const redMovesLeft = this.board.shortestPathLength(
            this.board.topVirtualNode,
            this.board.bottomVirtualNode,
            Token.RED);
        const blueMovesLeft = this.board.shortestPathLength(
            this.board.leftVirtualNode,
            this.board.rightVirtualNode,
            Token.BLUE);
        return blueMovesLeft - redMovesLeft;
    }

    private minimax(depth: number, isMax: boolean) {
        return this._minimax(depth, isMax, GameEvaluator.MINIMAX_MIN_VAL, GameEvaluator.MINIMAX_MAX_VAL);
    }

    private _minimax(depth: number, isMax: boolean, alpha: number, beta: number): number {
        const evaluation = this.evaluate();
        
        if (evaluation === GameEvaluator.MINIMAX_MAX_VAL) {
            return GameEvaluator.MINIMAX_MAX_VAL;
        }
        if (evaluation === GameEvaluator.MINIMAX_MIN_VAL) {
            return GameEvaluator.MINIMAX_MIN_VAL;
        }
        if (depth === 0) {
            return evaluation;
        }

        const currentToken = isMax ? Token.RED : Token.BLUE;

        if (isMax) {
            let best = GameEvaluator.MINIMAX_MIN_VAL;
            for (const node of this.board.nodes) {
                if (node.getToken() === Token.EMPTY) {
                    this.board.putToken(node.x, node.y, currentToken);
                    best = Math.max(best, this._minimax(depth - 1, !isMax, alpha, beta));
                    this.board.removeToken(node.x, node.y);

                    if (best > beta) {
                        break;
                    }
                    alpha = Math.max(alpha, best);
                }
            }
            return best;
        }
        else {
            let best = GameEvaluator.MINIMAX_MAX_VAL;
            for (const node of this.board.nodes) {
                if (node.getToken() === Token.EMPTY) {
                    this.board.putToken(node.x, node.y, currentToken);
                    best = Math.min(best, this._minimax(depth - 1, !isMax, alpha, beta));
                    this.board.removeToken(node.x, node.y);

                    if (best < alpha) {
                        break;
                    }
                    beta = Math.min(beta, best);
                }
            }
            return best;
        }
    }

    // TODO: remove console log statements
}