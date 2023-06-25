import { Piece } from "./Counter";

export class BoardCell {
  pieceOnThisCell: Piece | string | undefined;

  constructor(pieceOnThisCell: Piece | undefined) {
    this.pieceOnThisCell = pieceOnThisCell;
  }

  setCounter(newCounter: Piece) {
    this.pieceOnThisCell = newCounter;
  }
}
