import React from "react";
import Board from "../components/game/Board";
import { Board as Gameboard } from "../models/Board";

const Game: React.FC = () => {
  const gameBoard = new Gameboard("some value");
  gameBoard.getBoard();
  return (
    <>
      <Board />
    </>
  );
};

export default Game;
