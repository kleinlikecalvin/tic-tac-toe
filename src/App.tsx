import React from "react";
import { useAppState } from "./reducer";
import "./App.css";

export default function App() {
  const [state, dispatch] = useAppState();
  let boardClasses = "board";
  let message;

  if (state.winningPlayer) {
    boardClasses = "board game-over";
    message = `The Champion is ${state.winningPlayer}`;
  } else if (!state.spaces.includes(null) && state.winningPlayer === null) {
    boardClasses = "board game-over";
    message = "This game is for the cats";
  } else {
    message = `Current Player: ${state.turn}`;
  }

  return (
    <div className="App">
      <div className={boardClasses}>
        {state.spaces.map((value, index) => {
          const isWinningSquare = state.winningSquares?.includes(index);
          return (
            <button
              className={isWinningSquare ? "square winner-declared" : "square"}
              disabled={!!value || state.turn === "O" || !!state.winningPlayer}
              key={index}
              onClick={() => dispatch.userPlay(index)}
            >
              {value || null}
            </button>
          );
        })}
      </div>
      <div className="game-play">
        <div className="turns">{message}</div>
        <button
          className="reset"
          onClick={() => {
            dispatch.reset();
          }}
        >
          Reset game
        </button>
      </div>
    </div>
  );
}
