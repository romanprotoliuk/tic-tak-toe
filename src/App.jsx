import "./App.css";
import { useState } from "react";

const NUMBERS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winningCombo = (board) => {
  for (let i = 0; i < NUMBERS.length; i++) {
    const [x, y, z] = NUMBERS[i];
    if (board != null && board[x] === board[y] && board[y] === board[z]) {
      return board[x];
    }
  }

  return null;
};

const Cell = ({ index, disabled, mark, turn, onClick }) => {
  return (
    <button
      aria-label={mark == null ? `Mark cell ${index} as ${turn}` : undefined}
      className="cell"
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
};
const App = () => {
  const [xIsPlaying, setIsXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  const winner = winningCombo(board);

  const winningMessage = () => {
    if (winner !== null) {
      return `Player ${winner} wins`;
    }

    if (!board.includes(null)) {
      return "It's a draw!";
    }

    return `Player ${xIsPlaying ? "X" : "O"}`;
  };

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  };

  return (
    <div className="App">
      <h2>{winningMessage()}</h2>
      <div className="container">
        <div className="board">
          {Array(9)
            .fill(null)
            .map((_, index) => index)
            .map((cellIndex) => {
              const turn = xIsPlaying ? "X" : "O";
              return (
                <Cell
                  key={cellIndex}
                  disabled={board[cellIndex] != null || winner != null}
                  index={cellIndex}
                  mark={board[cellIndex]}
                  turn={turn}
                  onClick={() => {
                    const newBoard = board.slice();
                    newBoard[cellIndex] = turn;
                    setBoard(newBoard);
                    setIsXPlaying(!xIsPlaying);
                  }}
                />
              );
            })}
        </div>
      </div>

      <button
        className="btn-reset"
        onClick={() => {
          if (winner == null) {
            const confirm = window.confirm(
              "Are you sure you want to reset the game?"
            );
            if (!confirm) return;
          }

          onReset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
