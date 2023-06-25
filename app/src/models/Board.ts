import { Counter } from "./Counter";

export class Board {
  player: string;
  NUM_ROWS: number;
  NUM_COLUMNS: number;
  board: (Counter | null)[][];

  constructor(player: string) {
    this.player = player;
    this.NUM_ROWS = 6;
    this.NUM_COLUMNS = 7;

    this.board = this.makeBoard();
  }

  makeBoard() {
    const board: (Counter | null)[][] = [];

    for (let i = 0; i < this.NUM_ROWS; i++) {
      board.push([]);
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        board[i].push(null);
      }
    }

    return board;
  }

  getBoard() {
    return this.board;
  }

  setBoard(newBoard: (Counter | null)[][]) {
    this.board = newBoard;
  }

  isCounterOnCell(firstIndex: number, secondIndex: number) {
    const board = this.getBoard();
    return board[firstIndex][secondIndex] !== null;
  }

  placePiece(columnIndex: number) {
    const board = this.getBoard();
    const boardCopy = JSON.parse(JSON.stringify(board));

    loop1: for (let i = this.NUM_ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        if (j === columnIndex && board[i][j] === null) {
          boardCopy[i][j] = new Counter("hello");
          break loop1;
        }
      }
    }

    this.setBoard(boardCopy);
  }
}
