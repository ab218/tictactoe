import React from 'react';
import '../App.css';

const Button = ({
  gameOver,
  newGame,
  undo,
  undoMove,
}) => (
  <div>
    {gameOver
      ? (
        <button
          type="button"
          className="undo"
          onClick={() => newGame()}
        >
          New Game?
        </button>
      )
      : (
        <button
          type="button"
          className="undo"
          onClick={() => undoMove()}
        >
          {undo
            ? <i className="fas fa-redo" />
            : <i className="fas fa-undo" />}
        </button>
      )
    }
  </div>
);

export default Button;
