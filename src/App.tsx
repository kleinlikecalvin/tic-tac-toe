import React from "react";
import { PossibleWins } from "./constants";
import { matches } from "./utils";
import { Player } from "./types";
// import Square from "./Sqaure";
import "./App.css";

export default function App() {
  const [turn, setTurn] = React.useState<Player>("X");
  const [spaces, setSpaces] = React.useState<Player[]>(Array(9).fill(null));
  const updatedSpaces = [...spaces];
  let message;
  const isWinner = React.useMemo(() => {
    for (let i = 0; i < PossibleWins.length; i++) {
      const [a, b, c] = PossibleWins[i];
      const thereIsAMatch = matches(spaces[a], spaces[b], spaces[c]);
      if (thereIsAMatch) {
        return thereIsAMatch;
      }
    }
  }, [spaces]);

  function handleTurn(index: number) {
    updatedSpaces[index] = turn;
    setSpaces(updatedSpaces);

    if (turn === "O") {
      setTurn("X");
    } else {
      setTurn("O");
    }
  }

  if (isWinner) {
    message = `The Champion is ${isWinner}`;
  } else if (!updatedSpaces.includes(null) && isWinner === undefined) {
    message = "This game is for the cats";
  } else {
    message = `Current Player: ${turn}`;
  }
  return (
    <div className="App">
      <div className="board">
        {spaces.map((value, index) => (
          <button
            className="square"
            disabled={!!value || isWinner === "X" || isWinner === "O"}
            key={index}
            onClick={() => handleTurn(index)}
          >
            {value || null}
          </button>
        ))}
      </div>
      <div className="gamePlay">
        <div className="turns">{message}</div>
        <button
          className="reset"
          onClick={() => {
            setTurn("X");
            setSpaces(Array(9).fill(null));
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
