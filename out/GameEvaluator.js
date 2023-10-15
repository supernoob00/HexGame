import { Token } from "./Token";
import { Move } from "./Move";
export class GameEvaluator {
    constructor(board, searchDepth) {
        this.board = board;
        this.searchDepth = searchDepth;
    }
    chooseBestMove(tokenToPlace) {
        if (tokenToPlace === Token.RED) {
            return this.chooseBestMoveAsMaximizer();
        }
        return this.chooseBestMoveAsMinimizer();
    }
    chooseBestMoveAsMaximizer() {
        let max = GameEvaluator.MINIMAX_MIN_VAL;
        let bestMove;
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
        return new Move(bestMove.x, bestMove.y, GameEvaluator.MAXIMIZER_TOKEN);
    }
    chooseBestMoveAsMinimizer() {
        let min = GameEvaluator.MINIMAX_MAX_VAL;
        // TODO: change to a random node, may remain undefined otherwise
        let bestMove;
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
        return new Move(bestMove.x, bestMove.y, GameEvaluator.MINIMIZER_TOKEN);
    }
    evaluate() {
        const redMovesLeft = this.board.shortestPathLength(this.board.topVirtualNode, this.board.bottomVirtualNode, Token.RED);
        const blueMovesLeft = this.board.shortestPathLength(this.board.leftVirtualNode, this.board.rightVirtualNode, Token.BLUE);
        return blueMovesLeft - redMovesLeft;
    }
    minimax(depth, isMax) {
        return this._minimax(depth, isMax, GameEvaluator.MINIMAX_MIN_VAL, GameEvaluator.MINIMAX_MAX_VAL);
    }
    _minimax(depth, isMax, alpha, beta) {
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
}
GameEvaluator.MINIMAX_MAX_VAL = 1000;
GameEvaluator.MINIMAX_MIN_VAL = -1000;
GameEvaluator.MAXIMIZER_TOKEN = Token.RED;
GameEvaluator.MINIMIZER_TOKEN = Token.BLUE;
//# sourceMappingURL=GameEvaluator.js.map