import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * TicTacToe game container component that manages the game state and renders the game board.
 * Handles player turns, move validation, win detection, and game reset functionality.
 */
const TicTacToe = () => {
  // State for game board, current player, and game status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('Next player: X');

  /**
   * Calculates winner by checking all possible winning combinations
   * @param {Array} squares - Current state of the game board
   * @returns {string|null} - Returns 'X', 'O', or null
   */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  /**
   * Handles a player's move
   * @param {number} index - Index of the clicked cell
   */
  const handleMove = (index) => {
    // If cell is filled or there's a winner, ignore the click
    if (board[index] || calculateWinner(board)) return;

    // Create new board state
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    // Update game status
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus(`Winner: ${winner}`);
    } else if (newBoard.every(square => square !== null)) {
      setGameStatus('Game ended in a draw!');
    } else {
      setGameStatus(`Next player: ${isXNext ? 'O' : 'X'}`);
    }

    setIsXNext(!isXNext);
  };

  /**
   * Resets the game to initial state
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('Next player: X');
  };

  return (
    <div className="game-container">
      <div className="game-status">{gameStatus}</div>
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="game-cell"
            onClick={() => handleMove(index)}
            disabled={!!cell || !!calculateWinner(board)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="game-controls">
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
