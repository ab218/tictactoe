import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [
        {
          board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
      ],
      turn: 0,
      human: 'X',
      ai: 'O',
      aiWins: false,
      playerWins: false,
      gameDraw: false,
      gameOver: false,
      undo: false,
    };
  }

  availableSpots = board => board.filter(spot => spot !== 'O' && spot !== 'X');

  minimax = (currentBoard, player, depth) => {
    const { ai, human } = this.state;
    const emptySpots = this.availableSpots(currentBoard);

    
    if (this.calculateWinner(currentBoard, human)) {
      return { score: -10 };
    }
    if (this.calculateWinner(currentBoard, ai)) {
      return { score: 10 };
    }
    if (emptySpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < emptySpots.length; i++) {
      
      const move = {};
      move.index = currentBoard[emptySpots[i]];

      
      currentBoard[emptySpots[i]] = player;

      
      if (player === ai) {
        move.score = this.minimax(currentBoard, human).score;
      } else {
        move.score = this.minimax(currentBoard, ai).score;
      }

      
      currentBoard[emptySpots[i]] = move.index;

      
      moves.push(move);
    }

    
    let bestMove;
    if (player === ai) {
      let bestScore = -100000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
    
      let bestScore = 100000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];
  }

  calculateWinner = (squares, player) => {
    
    for (let i = 0; i < 7; i += 3) {
      if (squares[i] === squares[i + 1]
        && squares[i] === squares[i + 2]
        && squares[i] === player) {
        return true;
      }
    }

    
    for (let i = 0; i < 3; i++) {
      if (squares[i] === squares[i + 3]
        && squares[i] === squares[i + 6]
        && squares[i] === player) {
        return true;
      }
    }

    
    if (squares[2] === squares[4]
        && squares[2] === squares[6]
        && squares[2] === player) {
      return true;
    }

    
    if (squares[0] === squares[4]
        && squares[0] === squares[8]
        && squares[0] === player) {
      return true;
    }
    return false;
  }

  undoMove = () => {
    const { game, turn, undo } = this.state;
    if (game.length > 1) {
      const history = game.slice(0, turn + 1);
      const previous = history[history.length - 2];
      const prevSquares = previous.board.slice();
      this.setState({
        game: game.concat([
          {
            board: prevSquares,
          },
        ]),
        turn: turn + 1,
        undo: undo ? false : true
      });
    }
  }

  handleClick = (i) => {
    const {
      ai,
      game,
      human,
      turn,
    } = this.state;
    const history = game.slice(0, turn + 1);
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
    if (this.calculateWinner(squares, human)) {
      return this.setState({ gameOver: true, playerWins: true });
    }
    squares[this.minimax(squares, ai).index] = ai;
    if (this.calculateWinner(squares, ai)) {
      return this.setState({ gameOver: true, aiWins: true });
    }
    if (!this.availableSpots(squares).length) {
      return this.setState({ gameOver: true, gameDraw: true });
    }
    console.log(game);
  };

  render() {
    const {
      aiWins, gameDraw, gameOver, playerWins, game, turn, undo,
    } = this.state;
    return (
      <div className="App">
        <Board
          squares={game[turn]}
          onClick={i => this.handleClick(i)}
        />
        {aiWins && <h1>AI Wins.</h1>}
        {playerWins && <h1>Player Wins.</h1>}
        {gameDraw && <h1>Draw</h1>}
        {gameOver || 
        <button
          onClick={() => this.undoMove()}
        >
          {undo
            ? 'Redo'
            : 'Undo'}
        </button>
        }
      </div>
    );
  }
}

export default App;
