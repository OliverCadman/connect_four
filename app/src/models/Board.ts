export class Board {
  player: string;

  constructor(player: string) {
    this.player = player;
  }

  makeBoard() {
    const NUM_ROWS: number = 6;
    const NUM_COLUMNS: number = 7;

    const board: null[][] = [];

    for (let i = 0; i < NUM_ROWS; i++) {
      board.push([]);
      for (let j = 0; j < NUM_COLUMNS; j++) {
        board[i].push(null);
      }
    }

    return board;
  }

  getBoard() {
    return this.makeBoard();
  }
}
