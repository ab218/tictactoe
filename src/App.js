import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      game: [
        {
          board: Array(9).fill(null)
        }
      ],
      turn: 0,
      currentPlayer: 'X'
    }
  }

  handleClick = (i) => {
    const { currentPlayer, game, turn } = this.state

    const history = game.slice(0, turn + 1);
    const current = history[history.length - 1];
    // create shallow copy of current board array
    const squares = current.board.slice();
    
    squares[i] = currentPlayer;
    this.setState({
      game: game.concat([
          {
            board: squares
          }
      ]),
      turn: turn + 1,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X'
    })
  };

  render() {
    const { game, turn } = this.state;
    return (
      <div className="App">
        <Board 
        squares={game[turn]}
        onClick={(i) => this.handleClick(i)}/>
      </div>
    );
  }
}

export default App;
