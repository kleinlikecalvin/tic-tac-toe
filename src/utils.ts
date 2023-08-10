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
  /**
   * @NOTE
   * we've got work to do
   * --Need to disable the users ability to play while the op is taking it's turn
   * --Update the spaces array with the op's turn
   * --Create a table to grade the remaining moves
   */
  const empties = [];

  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === null) {
      empties.push(i);
    }
  }

  for (let i = 0; i < empties.length; i++) {
    var testBoard = [...currentBoard];
    var index = empties[i];

    testBoard[index] = player;
    const isWinner = getWinner(testBoard);

    if (isWinner) {
      return empties[i];
    }
  }

  for (let i = 0; i < currentBoard.length; i++) {
    var testBoard = [...currentBoard];
    var index = empties[i];
    const otherPlayer = player === "O" ? "X" : "O";

    testBoard[index] = otherPlayer;
    const isWinner = getWinner(testBoard);

    if (isWinner) {
      return empties[i];
    }
  }

  const randomNum = Math.floor(Math.random() * empties.length);

  return empties[randomNum];
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
