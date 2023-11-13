import { Counter } from "./Counter";
import { Player } from "./Player";

export class Board {
  currentPlayer: Player;
  NUM_ROWS: number;
  NUM_COLUMNS: number;
  board: (Counter | null)[][];
  playerOne: Player;
  playerTwo: Player;
  gameOver: boolean;
  isDrawn: boolean;
  isPlayerComputer: boolean;
  numCountersPlaced: number;

  constructor(isPlayerComputer: boolean) {
    this.isPlayerComputer = isPlayerComputer;

    this.playerOne = new Player("red", "Player 1");
    this.playerTwo = this.isPlayerComputer
      ? new Player("yellow", "CPU")
      : new Player("yellow", "Player 2");

    this.currentPlayer = this.playerOne;
    this.NUM_ROWS = 6;
    this.NUM_COLUMNS = 7;

    this.board = this.makeBoard();

    this.gameOver = false;
    this.isDrawn = false;
    this.numCountersPlaced = 0;
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
    if (this.gameOver) return;

    const board = this.getBoard();

    loop1: for (let i = this.NUM_ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < this.NUM_COLUMNS; j++) {
        if (j === columnIndex && board[i][j] === null) {
          board[i][j] = new Counter(
            this.currentPlayer === this.playerOne
              ? this.playerOne
              : this.playerTwo
          );
          break loop1;
        }
      }
    }

    this.numCountersPlaced++;
    this.setBoard(board);
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

  opponentWinsOnTime() {
    if (this.currentPlayer.playerName === "Player 1") {
      this.playerTwo.incrementScore();
      return this.playerTwo;
    } else {
      this.playerOne.incrementScore();
      return this.playerOne;
    }
  }

  playerHasWon() {
    // Game is drawn
    this.setGameoverIfDrawn();

    if (this.gameOver) return;

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
          this.gameOver = true;
          board[i][j]?.player.incrementScore();
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
          board[i][j]?.player.incrementScore();
          this.gameOver = true;
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
          board[i][j]?.player.incrementScore();
          this.gameOver = true;
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
          board[i][j]?.player.incrementScore();
          this.gameOver = true;
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

  private setGameoverIfDrawn() {
    if (this.numCountersPlaced === 42) {
      console.log("hellooooo");
      this.gameOver = true;
      this.isDrawn = true;
      return false;
    }
  }
}
