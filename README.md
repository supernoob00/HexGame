# HexGame

The goal of Hex is to create a bridge from one side to the other. Red tries to create a bridge from top to bottom (or vice versa), while blue tries to create one from left to right. Each player can place a token wherever there's an empty space, and players alternate turns. With these simple rules, a game of incredibly deep strategy emerges.

This Hex app allows for local play with another person, as well as an AI. The AI uses a minimax algorithm of depth 1 with alpha-beta pruning, and a simple evaluation function for boardstates (the number of blue tokens needed to win, minus the number of red tokens needed to win). Djikstra's algorithm is used to find the shortest bridge and determine the evaluation result.
