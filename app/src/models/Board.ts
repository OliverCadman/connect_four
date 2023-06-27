import { Counter } from "./Counter";
import { Player } from "./Player";

export class Board {
  currentPlayer: Player;
  NUM_ROWS: number;
  NUM_COLUMNS: number;
  board: (Counter | null)[][];
  playerOne: Player;
  playerTwo: Player;

  constructor() {
    this.playerOne = new Player("red");
    this.playerTwo = new Player("yellow");

    this.currentPlayer = this.playerOne;
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

  private setBoard(newBoard: (Counter | null)[][]) {
    this.board = newBoard;
  }

  private setPlayer() {
    this.currentPlayer =
      this.currentPlayer.color === "red" ? this.playerTwo : this.playerOne;
  }

  placePiece(columnIndex: number) {
    const board = this.getBoard();
    const boardCopy = JSON.parse(JSON.stringify(board));

    loop1: for (let i = this.NUM_ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        if (j === columnIndex && board[i][j] === null) {
          boardCopy[i][j] = new Counter(
            this.currentPlayer === this.playerOne
              ? this.playerOne
              : this.playerTwo
          );
          break loop1;
        }
      }
    }

    this.setBoard(boardCopy);
    this.setPlayer();
  }

  private checkLine(
    a: Counter | null,
    b: Counter | null,
    c: Counter | null,
    d: Counter | null
  ) {
    return (
      a != null &&
      a.player.color === b?.player.color &&
      b.player.color === c?.player.color &&
      c.player.color === d?.player.color
    );
  }

  playerHasWon() {
    const board = this.getBoard();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          this.checkLine(
            board[i][j],
            board[i + 1][j],
            board[i + 2][j],
            board[i + 3][j]
          )
        ) {
          return {
            player: board[i][j]?.player,
            cellIndex1: [i, j],
            cellIndex2: [i + 1, j],
            cellIndex3: [i + 2, j],
            cellIndex4: [i + 3, j],
          };
        }
      }
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.checkLine(
            board[i][j],
            board[i][j + 1],
            board[i][j + 2],
            board[i][j + 3]
          )
        ) {
          return {
            player: board[i][j]?.player,
            cellIndex1: [i, j],
            cellIndex2: [i, j + 1],
            cellIndex3: [i, j + 2],
            cellIndex4: [i, j + 3],
          };
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.checkLine(
            board[i][j],
            board[i + 1][j + 1],
            board[i + 2][j + 2],
            board[i + 3][j + 3]
          )
        ) {
          return {
            player: board[i][j]?.player,
            cellIndex1: [i, j],
            cellIndex2: [i + 1, j + 1],
            cellIndex3: [i + 2, j + 2],
            cellIndex4: [i + 3, j + 3],
          };
        }
      }
    }

    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.checkLine(
            board[i][j],
            board[i - 1][j + 1],
            board[i - 2][j + 2],
            board[i - 3][j + 3]
          )
        ) {
          return {
            player: board[i][j]?.player,
            cellIndex1: [i, j],
            cellIndex2: [i - 1, j + 1],
            cellIndex3: [i - 2, j + 2],
            cellIndex4: [i - 3, j + 3],
          };
        }
      }
    }
  }
}
