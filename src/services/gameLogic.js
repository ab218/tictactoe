export const availableSpots = board => board.filter(spot => spot !== 'O' && spot !== 'X');

export const calculateWinner = (squares, player) => {
  // rows
  for (let i = 0; i < 7; i += 3) {
    if (squares[i] === squares[i + 1]
      && squares[i] === squares[i + 2]
      && squares[i] === player) {
      return true;
    }
  }

  // columns
  for (let i = 0; i < 3; i++) {
    if (squares[i] === squares[i + 3]
      && squares[i] === squares[i + 6]
      && squares[i] === player) {
      return true;
    }
  }

  // diag
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
};

export const minimax = (currentBoard, player, ai, human) => {
  const board = currentBoard;
  const emptySpots = availableSpots(board);
  if (calculateWinner(board, human)) {
    return { score: -10 };
  }
  if (calculateWinner(board, ai)) {
    return { score: 10 };
  }
  if (emptySpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  emptySpots.forEach((e) => {
    const move = {};
    move.index = board[e];
    board[e] = player;
    if (player === ai) {
      move.score = minimax(board, human, ai, human).score;
    } else {
      move.score = minimax(board, ai, ai, human).score;
    }
    board[e] = move.index;
    moves.push(move);
  });
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
};
