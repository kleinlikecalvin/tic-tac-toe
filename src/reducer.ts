import { getWinner, getBestMove, wait } from "./utils";
import { Player, Board } from "./types";
import React from "react";

export type State = {
  turn: Player;
  spaces: Board;
  winningPlayer: Player | null;
  winningSquares: [number, number, number] | null;
};

export const initialState: State = {
  turn: "X",
  spaces: Array(9).fill(null),
  winningPlayer: null,
  winningSquares: null,
};

export function reducer(state: State, action: any): State {
  switch (action.type) {
    case "user-play": {
      const spaces = [...state.spaces];
      spaces[action.payload] = "X";
      const winningSquares = getWinner(spaces);
      const winningPlayer = winningSquares ? "X" : null;
      return { ...state, turn: "O", spaces, winningSquares, winningPlayer };
    }
    case "opponent-play": {
      if (state.winningPlayer) {
        return state;
      }
      const spaces = [...state.spaces];
      const nextMove = getBestMove(spaces, "O");
      spaces[nextMove] = "O";
      const winningSquares = getWinner(spaces);
      const winningPlayer = winningSquares ? "O" : null;
      return { ...state, turn: "X", spaces, winningSquares, winningPlayer };
    }
    case "reset": {
      return { ...initialState };
    }
  }
  return state;
}

export function useAppState() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatcher = React.useMemo(
    () =>
      ({
        userPlay: (index: number) =>
          dispatch({ type: "user-play", payload: index }),
        opponentPlay: () => dispatch({ type: "opponent-play" }),
        reset: () => dispatch({ type: "reset" }),
      } as const),
    [dispatch]
  );
  React.useEffect(() => {
    if (state.turn === "X") {
      return;
    }
    wait(500).then(dispatcher.opponentPlay);
  }, [state.turn, dispatcher]);
  return [state, dispatcher] as const;
}
