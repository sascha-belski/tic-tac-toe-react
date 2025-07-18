import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface SquareProps {
  value: string | null;
  className: string | null;
  onClick: () => void;
}

function Square({ value, className, onClick }: SquareProps) {
  return (
    <button className={`square ${className ?? ''}`} onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number): void {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const [winner, winningLine]: [string | null, number[]] = calculateWinner(squares) ?? [null, []];
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            const isWinningSquare = winningLine.includes(index);
            return (
              <Square
                key={index}
                value={squares[index]}
                className={isWinningSquare ? 'win' : ''}
                onClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
      <button className="restart-button" onClick={handleRestart}>Restart</button>
    </>
  );
}

function calculateWinner(squares: (string | null)[]): [string, number[]] | null  {
  const lines: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return null;
}

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="game">
        <Board />
      </div>
      <h3>tic toc toe game</h3>
    </>
  );
}

export default App
