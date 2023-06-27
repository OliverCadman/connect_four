import React from "react";
import { ReactComponent as BoardWhiteLg } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardBlackLg } from "../../assets/images/board-layer-black-large.svg";

import { Board as Gameboard } from "../../models/Board";

const Board: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  const gameBoard = new Gameboard("some value");
  const boardGrid = gameBoard.getBoard();

  return (
    <div className="board__container centered">
      <div className="board__wrapper--grid-container">
        {boardGrid.map((row, index) => {
          return (
            <React.Fragment key={index}>
              {row.map((cell, index) => {
                return <div id={`cell-${index}`}></div>;
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className="board__wrapper--inner black">
        <BoardBlackLg />
      </div>
      <div className="board__wrapper--inner white">
        <BoardWhiteLg />
      </div>
    </div>
  );
};

export default Board;
