/**
 * Represents the three possible, singular states of each tile on the Hex game board.
 * The common convention is for red to go first.
 */
export var Token;
(function (Token) {
    Token[Token["RED"] = 0] = "RED";
    Token[Token["BLUE"] = 1] = "BLUE";
    Token[Token["EMPTY"] = 2] = "EMPTY";
})(Token || (Token = {}));
//# sourceMappingURL=Token.js.map