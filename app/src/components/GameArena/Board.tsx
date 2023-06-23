import React from "react";
import { ReactComponent as BoardLayerWhiteLarge } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardLayerBlackLarge } from "../../assets/images/board-layer-black-large.svg";

const Board: React.FC = () => {
  return (
    <div className="board__container">
      <div className="board__wrapper">
        <div className="board__layer white">
          <BoardLayerWhiteLarge />
        </div>
        <div className="board__layer black">
          <BoardLayerBlackLarge />
        </div>
      </div>
    </div>
  );
};

export default Board;
