import React from "react";
import { PossibleWins } from "./constants";
import { matches } from "./utils";
import { Player } from "./types";
import "./App.css";

export default function App() {
  const [turn, setTurn] = React.useState<Player>("X");
  const [spaces, setSpaces] = React.useState<Player[]>(Array(9).fill(null));
  const updatedSpaces = [...spaces];
  let boardClasses = "board";
  let message;

  const isWinner = React.useMemo(() => {
    for (let i = 0; i < PossibleWins.length; i++) {
      const [a, b, c] = PossibleWins[i];
      const thereIsAMatch = matches(spaces[a], spaces[b], spaces[c]);
      if (thereIsAMatch) {
        return {
          player: thereIsAMatch,
          squares: [a, b, c],
        };
      }
    }
  }, [spaces]);

  function handleTurn(index: number) {
    updatedSpaces[index] = turn;
    setSpaces(updatedSpaces);
    setTurn(() => (turn === "X" ? "O" : "X"));
  }

  if (isWinner) {
    boardClasses = "board game-over";
    message = `The Champion is ${isWinner.player}`;
  } else if (!updatedSpaces.includes(null) && isWinner === undefined) {
    boardClasses = "board game-over";
    message = "This game is for the cats";
  } else {
    message = `Current Player: ${turn}`;
  }

  return (
    <div className="App">
      <div className={boardClasses}>
        {spaces.map((value, index) => {
          const isWinningSquare = isWinner?.squares.includes(index);
          return (
            <button
              className={isWinningSquare ? "square winner-declared" : "square"}
              disabled={!!value}
              key={index}
              onClick={() => handleTurn(index)}
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
            setTurn("X");
            setSpaces(Array(9).fill(null));
          }}
        >
          Reset game
        </button>
      </div>
    </div>
  );
}
