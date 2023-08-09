import { Board, Cell, Player } from "./types";

export const PossibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function matches(a: Cell, b: Cell, c: Cell) {
  if (a === null) return false;
  if (b !== a) return false;
  if (c !== b) return false;
  return a;
}

export function getBestMove(currentBoard: Board, player: Player): number {
  const liveBoard = [...currentBoard];
  for (let i = 0; i < currentBoard.length; i++) {
    var testBoard = [...currentBoard];
    if (testBoard[i] === null) {
      testBoard[i] = player;
      const isWinner = getWinner(testBoard);
      if (isWinner) {
        return i;
      } else {
        //we've got work to do
        // Need to disable the users ability to play while the op is taking it's turn
        // Update the spaces array with the op's turn
        // Create a table to grade the remaining moves
      }
    }
  }
  return 0;
}

export type Winner = { player: Cell; squares: [number, number, number] };
export function getWinner(board: Cell[]): Winner | undefined {
  for (let i = 0; i < PossibleWins.length; i++) {
    const [a, b, c] = PossibleWins[i];
    const thereIsAMatch = matches(board[a], board[b], board[c]);
    if (thereIsAMatch) {
      return {
        player: thereIsAMatch,
        squares: [a, b, c],
      };
    }
  }
}
