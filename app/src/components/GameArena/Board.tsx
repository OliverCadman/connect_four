import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { ReactComponent as BoardLayerWhiteLarge } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardLayerBlackLarge } from "../../assets/images/board-layer-black-large.svg";
import { ReactComponent as BoardLayerWhiteSmall } from "../../assets/images/board-layer-white-small.svg";
import { ReactComponent as BoardLayerBlackSmall } from "../../assets/images/board-layer-black-small.svg";

import { ReactComponent as MarkerRed } from "../../assets/images/marker-red.svg";

import GridCell from "./GridCell";
import Counter from "./Counter";
import { Board as GameBoard } from "../../models/Board";
import { useWindowWidth } from "../../hooks/UseWindowWidth";
import { useAppStateContext } from "../../context/AppStateContext";

import cloneDeep from "lodash.clonedeep";

const Board: React.FC = () => {
  const [game, setGame] = useState<GameBoard | undefined>(
    new GameBoard("PlayerOne")
  );
  const board = game && game.getBoard();

  const NUM_MARKERS = 7;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

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

  const handleMouseOver = (e: BaseSyntheticEvent) => {
    const target = e.target;
    e.stopPropagation();
    if (target.classList.contains("grid-cell")) {
      const index = target.classList[1].split("-")[2];
      setHoverIndex(parseInt(index));
    }
  };

  const handleMouseOut = () => {
    setHoverIndex(null);
  };

  const handleClick = (columnIndex: number) => {
    setGame((prevGame) => {
      const gameCopy = cloneDeep(prevGame);
      gameCopy?.placePiece(columnIndex);
      return gameCopy;
    });
  };

  useEffect(() => {
    console.log(game?.board, game?.player);
  }, [game]);

  return (
    <>
      {appState.isMobileDevice ? (
        <>
          <div className="board__container">
            <div className="board__wrapper">
              <div className="gameboard__grid">
                {board.map((row, rowIndex) => {
                  return (
                    <React.Fragment key={rowIndex}>
                      {row.map((cell, columnIndex) => {
                        return (
                          <GridCell
                            key={columnIndex}
                            rowIndex={rowIndex}
                            columnIndex={columnIndex}
                            handleClick={handleClick}
                          >
                            {cell ? (
                              <Counter
                                isMobileDevice={true}
                                color={cell.color}
                              />
                            ) : (
                              ""
                            )}
                          </GridCell>
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
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="board__container">
            <div className="marker-strip__container">
              {Array.from(Array(NUM_MARKERS), (marker, index) => {
                return (
                  <MarkerRed
                    style={
                      hoverIndex === index ? { opacity: 1 } : { opacity: 0 }
                    }
                    key={index}
                    className={`marker marker-${index}`}
                  />
                );
              })}
            </div>
            <div className="board__wrapper">
              <div className="gameboard__grid">
                {board.map((row, rowIndex) => {
                  return (
                    <React.Fragment key={rowIndex}>
                      {row.map((cell, columnIndex) => {
                        console.log(cell);
                        return (
                          <GridCell
                            key={columnIndex}
                            columnIndex={columnIndex}
                            rowIndex={rowIndex}
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            handleClick={handleClick}
                          >
                            {cell ? (
                              <Counter
                                isMobileDevice={false}
                                color={cell.color}
                              />
                            ) : (
                              ""
                            )}
                          </GridCell>
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Board;
