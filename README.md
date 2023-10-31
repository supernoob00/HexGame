# HexGame
Allows for local play with another person, as well as an AI. The AI uses a minimax algorithm of depth 1 with alpha-beta pruning, and a simple evaluation function for boardstates (the number of blue tokens needed to win, minus the number of red tokens needed to win). Djikstra's algorithm is used to find the shortest bridge and determine the evaluation result.
