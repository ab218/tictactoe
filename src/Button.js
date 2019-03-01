import React from 'react';
import './App.css';

const Button = ({ gameOver, newGame, undo, undoMove }) => {
    return (
      <div>
        {gameOver
        ? <button className='undo' onClick={() => newGame()}>New Game?</button>
        : <button className='undo' onClick={() => undoMove()}
          >
        {undo
        ? <i className="fas fa-redo"></i>
        : <i className="fas fa-undo"></i>}
        </button>
        }
      </div>
    );
}

export default Button;
