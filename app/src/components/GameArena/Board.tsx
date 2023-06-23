import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { ReactComponent as BoardLayerWhiteLarge } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardLayerBlackLarge } from "../../assets/images/board-layer-black-large.svg";
import { ReactComponent as BoardLayerWhiteSmall } from "../../assets/images/board-layer-white-small.svg";
import { ReactComponent as BoardLayerBlackSmall } from "../../assets/images/board-layer-black-small.svg";
import { ReactComponent as RedChipLarge } from "../../assets/images/counter-red-large.svg";
import { ReactComponent as RedChipSmall } from "../../assets/images/counter-red-small.svg";
import { ReactComponent as MarkerRed } from "../../assets/images/marker-red.svg";
import { ReactComponent as MarkerYellow } from "../../assets/images/marker-yellow.svg";

import GridCell from "./GridCell";
import { Board as GameBoard } from "../../models/Board";
import { useWindowWidth } from "../../hooks/UseWindowWidth";
import { useAppStateContext } from "../../context/AppStateContext";

const Board: React.FC = () => {
  const game: GameBoard = new GameBoard("Player One");
  const board = game.getBoard();

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
    } else setHoverIndex(null);
  };

  const handleMouseOut = () => {
    setHoverIndex(null);
  };

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
                            showMarker={null}
                            key={columnIndex}
                            rowIndex={rowIndex}
                            columnIndex={columnIndex}
                          >
                            {/* <RedChipSmall /> */}
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
                    key={marker}
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
                        return (
                          <GridCell
                            showMarker={
                              columnIndex === hoverIndex && rowIndex === 0
                            }
                            key={columnIndex}
                            columnIndex={columnIndex}
                            rowIndex={rowIndex}
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                          >
                            {/* <RedChipLarge className="chip" /> */}
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
