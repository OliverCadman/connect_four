export class Board {
  player: string;
  NUM_ROWS: number;
  NUM_COLUMNS: number;

  constructor(player: string) {
    this.player = player;
    this.NUM_ROWS = 6;
    this.NUM_COLUMNS = 7;
  }

  makeBoard() {
    const board: null[][] = [];

    for (let i = 0; i < this.NUM_ROWS; i++) {
      board.push([]);
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        board[i].push(null);
      }
    }

    return board;
  }

  getBoard() {
    return this.makeBoard();
  }

  isCounterOnCell(firstIndex: number, secondIndex: number) {
    const board = this.getBoard();
    return board[firstIndex][secondIndex] !== null;
  }

  placePiece(columnIndex: number) {
    const board = this.getBoard();

    loop1: for (let i = this.NUM_ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        if (j === columnIndex && board[i][j] === null) {
          console.log("hello!", board[i][j], i, j);
          break loop1;
        }
      }
    }
  }
}
