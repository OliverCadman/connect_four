import React, { useState, useEffect } from "react";
import { ReactComponent as BoardLayerWhiteLarge } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardLayerBlackLarge } from "../../assets/images/board-layer-black-large.svg";
import { ReactComponent as BoardLayerWhiteSmall } from "../../assets/images/board-layer-white-small.svg";
import { ReactComponent as BoardLayerBlackSmall } from "../../assets/images/board-layer-black-small.svg";
import { ReactComponent as RedChipLarge } from "../../assets/images/counter-red-large.svg";
import { ReactComponent as RedChipSmall } from "../../assets/images/counter-red-small.svg";
import { Board as GameBoard } from "../../models/Board";

import { useWindowWidth } from "../../hooks/UseWindowWidth";
import { useAppStateContext } from "../../context/AppStateContext";

const Board: React.FC = () => {
  const game: GameBoard = new GameBoard("Player One");
  const board = game.getBoard();

  const windowWidth = useWindowWidth();
  const { appState, setAppState } = useAppStateContext();

  useEffect(() => {
    if (windowWidth && windowWidth < 768) {
      setAppState({
        ...appState,
        isMobileDevice: true,
      });
    } else {
      setAppState({
        ...appState,
        isMobileDevice: false,
      });
    }
  }, [windowWidth]);

  return (
    <div className="board__container">
      <div className="board__wrapper">
        {appState.isMobileDevice ? (
          <>
            <div className="gameboard__grid">
              {board.map((row, index) => {
                return (
                  <React.Fragment key={index}>
                    {row.map((cell, index) => {
                      return (
                        <div
                          key={index}
                          id={`board__cell-${index}`}
                          className="board__cell"
                        >
                          <RedChipSmall />
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="board__layer white">
              <BoardLayerWhiteSmall />
            </div>
            <div className="board__layer black">
              <BoardLayerBlackSmall />
            </div>
          </>
        ) : (
          <>
            <div className="gameboard__grid">
              {board.map((row, index) => {
                return (
                  <React.Fragment key={index}>
                    {row.map((cell, index) => {
                      return (
                        <div
                          key={index}
                          id={`board__cell-${index}`}
                          className="board__cell"
                        >
                          <RedChipLarge />
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="board__layer white">
              <BoardLayerWhiteLarge />
            </div>
            <div className="board__layer black">
              <BoardLayerBlackLarge />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
