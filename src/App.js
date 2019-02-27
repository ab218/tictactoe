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

  calculateWinner = (squares) => {
    const { currentPlayer } = this.state;
    // check rows
    for (let i = 0; i < 7; i += 3) {
      if (squares[i] === squares[i + 1]
        && squares[i] === squares[i + 2]
        && squares[i] === currentPlayer)
        return console.log(`${currentPlayer} wins with horizontal line`);
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (squares[i] === squares[i + 3]
        && squares[i] === squares[i + 6]
        && squares[i] === currentPlayer) {
        return console.log(`${currentPlayer} wins with vertical line`)
      }
    }

    // check diag
      if (squares[2] === squares[4]
        && squares[2] === squares[6]
        && squares[2] === currentPlayer) {
        return console.log(`${currentPlayer} wins with right diag line`)
    }

    // check diag
      if (squares[0] === squares[4]
        && squares[0] === squares[8]
        && squares[0] === currentPlayer) {
        return console.log(`${currentPlayer} wins with left diagnal line`)
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
    this.calculateWinner(squares)
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
