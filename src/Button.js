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
        ? 'Redo'
        : 'Undo'}
        </button>
        }
      </div>
    );
}

export default Button;
