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

interface IHighlightedCells {
  cell1: number[];
  cell2: number[];
  cell3: number[];
  cell4: number[];
}

const Board: React.FC = () => {
  const [game, setGame] = useState<GameBoard | undefined>(new GameBoard());
  const [highlightedCells, setHighlightedCells] = useState<
    IHighlightedCells | undefined
  >();

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
    const playerHasWon = game?.playerHasWon();

    if (playerHasWon) {
      const timeOut = setTimeout(() => {
        setHighlightedCells({
          cell1: playerHasWon.cellIndex1,
          cell2: playerHasWon.cellIndex2,
          cell3: playerHasWon.cellIndex3,
          cell4: playerHasWon.cellIndex4,
        });
      }, 400);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [game]);

  return (
    <>
      {appState.isMobileDevice ? (
        <>
          <div className="board__wrapper">
            <div className="gameboard__grid">
              {board &&
                board.map((row, rowIndex) => {
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
                                color={cell.player.color}
                                isHighlighted={
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell1[0] &&
                                    columnIndex ===
                                      highlightedCells.cell1[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell2[0] &&
                                    columnIndex ===
                                      highlightedCells.cell2[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell3[0] &&
                                    columnIndex ===
                                      highlightedCells.cell3[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell4[0] &&
                                    columnIndex === highlightedCells.cell4[1])
                                }
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
        </>
      ) : (
        <>
          <div className="board__wrapper">
            <div className="marker-strip__container">
              {Array.from(Array(NUM_MARKERS), (_, index) => {
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
            <div className="gameboard__grid">
              {board &&
                board.map((row, rowIndex) => {
                  return (
                    <React.Fragment key={rowIndex}>
                      {row.map((cell, columnIndex) => {
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
                                color={cell.player.color}
                                isHighlighted={
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell1[0] &&
                                    columnIndex ===
                                      highlightedCells.cell1[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell2[0] &&
                                    columnIndex ===
                                      highlightedCells.cell2[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell3[0] &&
                                    columnIndex ===
                                      highlightedCells.cell3[1]) ||
                                  (highlightedCells &&
                                    rowIndex === highlightedCells.cell4[0] &&
                                    columnIndex === highlightedCells.cell4[1])
                                }
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
        </>
      )}
    </>
  );
};

export default Board;
