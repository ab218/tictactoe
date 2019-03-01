import React from 'react';
import './App.css';

const Square = ({ gameOver, onClick, value }) => {
  if (value === 'X') {
    return (
      <button className="square">
        <p className="blue">{value}</p>
      </button>
    );
  } if (value === 'O') {
    return (
      <button className="square">
        <p className="pink">{value}</p>
      </button>
    );
  } if (gameOver === true) {
    return (
      <button className="square">
          <p>_</p>
      </button>
    );
  }
  return (
    <button className="square" onClick={onClick}>
      <p>_</p>
    </button>
  );
};

const Board = ({ gameOver, onClick, squares }) => {
  function renderSquare(i) {
    return (
      <Square
        gameOver={gameOver}
        value={squares.board[i]}
        onClick={() => onClick(i)}
      />
    );
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
