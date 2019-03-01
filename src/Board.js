import React from 'react';
import './App.css';

const Square = (props) => {
  if (props.value === 'X' || props.value === 'O') {
    return (
      <button className="square">
        {props.value}
      </button>
    );
  }
  return (
    <button className="square" onClick={props.onClick}>
      _
    </button>
  );
};

const Board = (props) => {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares.board[i]}
        onClick={() => props.onClick(i)}
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
