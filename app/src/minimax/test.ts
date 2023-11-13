const scorePosition = (board, piece) => {
  let score = 0;

  // Score centre column
  const centreArray = Array.from(
    board.map((row) => row[Math.floor(COLUMN_COUNT / 2)])
  );
  const centreCount = centreArray.filter((i) => i === piece).length;
  score += centreCount * 3;

  // Score horizontal positions
  for (let r = 0; r < ROW_COUNT; r++) {
    const rowArray = Array.from(board[r]);
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      // Create a horizontal window of 4
      const window = rowArray.slice(c, c + WINDOW_LENGTH);
      score += evaluateWindow(window, piece);
    }
  }

  // Score vertical positions
  for (let c = 0; c < COLUMN_COUNT; c++) {
    const colArray = Array.from(board.map((row) => row[c]));
    for (let r = 0; r < ROW_COUNT - 3; r++) {
      // Create a vertical window of 4
      const window = colArray.slice(r, r + WINDOW_LENGTH);
      score += evaluateWindow(window, piece);
    }
  }

  // Score positive diagonals
  for (let r = 0; r < ROW_COUNT - 3; r++) {
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      // Create a positive diagonal window of 4
      const window = Array.from(
        { length: WINDOW_LENGTH },
        (_, i) => board[r + i][c + i]
      );
      score += evaluateWindow(window, piece);
    }
  }

  // Score negative diagonals
  for (let r = 0; r < ROW_COUNT - 3; r++) {
    for (let c = 0; c < COLUMN_COUNT - 3; c++) {
      // Create a negative diagonal window of 4
      const window = Array.from(
        { length: WINDOW_LENGTH },
        (_, i) => board[r + 3 - i][c + i]
      );
      score += evaluateWindow(window, piece);
    }
  }

  return score;
};
