import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Button from './components/Button';
import ScoreBoard from './components/ScoreBoard';
import { availableSpots, calculateWinner, minimax } from './services/gameLogic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ai: 'O',
      aiWins: false,
      aiWinCount: 0,
      drawCount: 0,
      game: [
        {
          board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
      ],
      gameDraw: false,
      gameOver: false,
      human: 'X',
      playerWinCount: 0,
      playerWins: false,
      turn: 0,
      undo: false,
    };
  }

  newGame = () => {
    const { human } = this.state;
    this.setState({
      aiWins: false,
      gameDraw: false,
      gameOver: false,
      playerWins: false,
      turn: 0,
      undo: false,
    });
    if (human === 'X') {
      this.setState({
        ai: 'X',
        game: [
          {
            board: [0, 1, 2, 3, 4, 5, 'X', 7, 8],
          },
        ],
        human: 'O',
      });
    } else {
      this.setState({
        ai: 'O',
        game: [
          {
            board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
        ],
        human: 'X',
      });
    }
  }

  undoMove = () => {
    const { game, turn, undo } = this.state;
    if (game.length > 1) {
      this.setState({
        game: game.filter((_, i) => i !== game.length - 1),
        turn: turn - 1,
        undo: !undo,
      });
    }
  }

  handleClick = (i) => {
    const {
      ai,
      game,
      human,
      turn,
      playerWinCount,
      aiWinCount,
      drawCount,
    } = this.state;
    const history = game.slice();
    const current = history[history.length - 1];
    const squares = current.board.slice();
    squares[i] = human;
    this.setState({
      game: game.concat([
        {
          board: squares,
        },
      ]),
      turn: turn + 1,
      undo: false,
    });

    if (calculateWinner(squares, human)) {
      return this.setState({
        gameOver: true,
        playerWins: true,
        playerWinCount: playerWinCount + 1,
      });
    }

    squares[minimax(squares, ai, ai, human).index] = ai;

    if (calculateWinner(squares, ai)) {
      return this.setState({
        aiWinCount: aiWinCount + 1,
        aiWins: true,
        gameOver: true,
      });
    }

    if (!availableSpots(squares).length) {
      return this.setState({
        gameOver: true,
        gameDraw: true,
        drawCount: drawCount + 1,
      });
    }
  };

  render() {
    const {
      ai,
      aiWins,
      aiWinCount,
      drawCount,
      game,
      gameDraw,
      gameOver,
      human,
      playerWinCount,
      playerWins,
      turn,
      undo,
    } = this.state;
    return (
      <div className="App">
        <ScoreBoard
          aiWinCount={aiWinCount}
          playerWinCount={playerWinCount}
          drawCount={drawCount}
          human={human}
          ai={ai}
        />
        <Board
          ai={ai}
          squares={game[turn]}
          onClick={i => this.handleClick(i)}
          gameOver={gameOver}
        />
        <Button
          gameOver={gameOver}
          newGame={this.newGame}
          undo={undo}
          undoMove={this.undoMove}
        />
        {aiWins && <h1>AI Wins.</h1>}
        {playerWins && <h1>Player Wins.</h1>}
        {gameDraw && <h1>Draw.</h1>}
      </div>
    );
  }
}

export default App;
