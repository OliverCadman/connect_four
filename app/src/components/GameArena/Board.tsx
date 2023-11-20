import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { ReactComponent as BoardLayerWhiteLarge } from "../../assets/images/board-layer-white-large.svg";
import { ReactComponent as BoardLayerBlackLarge } from "../../assets/images/board-layer-black-large.svg";
import { ReactComponent as BoardLayerWhiteSmall } from "../../assets/images/board-layer-white-small.svg";
import { ReactComponent as BoardLayerBlackSmall } from "../../assets/images/board-layer-black-small.svg";
import { Board as Gameboard } from "../../models/Board";

import { ReactComponent as MarkerRed } from "../../assets/images/marker-red.svg";
import { ReactComponent as MarkerYellow } from "../../assets/images/marker-yellow.svg";

import GridCell from "./GridCell";
import Counter from "./Counter";
import Timer from "./Timer";

import { convertBoardAndCallMiniMax } from "../../minimax/minimax";

import { useWindowWidth } from "../../hooks/UseWindowWidth";
import { useAppStateContext } from "../../context/AppStateContext";
import { useGameContext } from "../../context/GameDataContext";
import { useLocation, useNavigate } from "react-router-dom";

import cloneDeep from "lodash.clonedeep";

const Board: React.FC = () => {
  const { gameState, setGameState } = useGameContext();
  const board = gameState.game?.getBoard();

  const { state } = useLocation();
  const navigate = useNavigate();

  const NUM_MARKERS = 7;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const windowWidth = useWindowWidth();
  const { appState, setAppState } = useAppStateContext();

  useEffect(() => {
    const savedGameMode = localStorage.getItem("game_mode");
    if (savedGameMode) {
      if (state && !state.hasOwnProperty("mode")) {
        setGameState((prevGameState) => {
          return {
            ...prevGameState,
            gameMode: savedGameMode,
          };
        });
      } else if (
        state &&
        state.hasOwnProperty("mode") &&
        savedGameMode !== state.mode
      ) {
        setGameState((prevGameState) => {
          return {
            ...prevGameState,
            gameMode: state.mode,
          };
        });
        localStorage.setItem("game_mode", state.mode);
      }
    } else if (!savedGameMode) {
      if (state && state.hasOwnProperty("mode")) {
        setGameState((prevGameState) => {
          return {
            ...prevGameState,
            gameMode: state.mode,
          };
        });
        localStorage.setItem("game_mode", state.mode);
      } else navigate("/connect_four/");
    }
  }, [state]);

  useEffect(() => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        game:
          prevGameState.gameMode === "cpu"
            ? new Gameboard(true)
            : new Gameboard(false),
        timerPaused: false,
        timer: 30,
      };
    });
  }, [gameState.gameMode]);

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

  useEffect(() => {
    if (gameState.timer < 0) {
      console.log("opponent wins on time");
      setGameState((prevGameState) => {
        const gameCopy = cloneDeep(prevGameState.game);
        const winner = gameCopy?.opponentWinsOnTime();
        return {
          ...prevGameState,
          game: gameCopy,
          isGameOver: true,
          gameWinner: winner,
        };
      });
      return;
    }

    if (!gameState.timerPaused) {
      const interval = window.setInterval(() => {
        setGameState((prevGameState) => {
          return {
            ...prevGameState,
            timer: prevGameState.timer - 1,
          };
        });
      }, 1000);
      return () => window.clearInterval(interval);
    }
  }, [gameState.timer, gameState.timerPaused]);

  const restartGame = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        gameBoard: prevGameState.game?.restartGame(),
        isGameOver: false,
        gameWinner: undefined,
        highlightedCells: undefined,
        timer: 30,
      };
    });
  };

  const updateGameState = (column: number) => {
    if (gameState.isGameOver) return;

    setGameState((prevGameState) => {
      const gameCopy = cloneDeep(prevGameState.game);
      gameCopy?.placePiece(column);

      return {
        ...prevGameState,
        game: gameCopy,
        timer: 30,
      };
    });
  };

  useEffect(() => {
    if (gameState?.game?.currentPlayer.playerName === "CPU") {
      const [col, _] = convertBoardAndCallMiniMax(board);

      const timeout = setTimeout(() => {
        col !== null && updateGameState(col);
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [board]);

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
    if (gameState?.game?.currentPlayer.playerName === "CPU") return;
    updateGameState(columnIndex);
  };

  useEffect(() => {
    const playerHasWon = gameState?.game?.playerHasWon();

    if (playerHasWon) {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          isGameOver: true,
          gameWinner: playerHasWon.player,
          highlightedCells: {
            cell1: playerHasWon.cellIndex1,
            cell2: playerHasWon.cellIndex2,
            cell3: playerHasWon.cellIndex3,
            cell4: playerHasWon.cellIndex4,
          },
        };
      });
    }
  }, [gameState?.game]);

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
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell1[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell1[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell2[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell2[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell3[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell3[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell4[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell4[1])
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
            <Timer
              playerTurn={gameState?.game?.currentPlayer}
              time={gameState.timer}
              winner={gameState.gameWinner}
              isDrawn={gameState.isDrawn}
              restartGame={restartGame}
            />
          </div>
        </>
      ) : (
        <>
          <div className="board__wrapper">
            <div className="marker-strip__container">
              {Array.from(Array(NUM_MARKERS), (_, index) => {
                return gameState?.game?.currentPlayer.color === "red" ? (
                  <MarkerRed
                    style={
                      hoverIndex === index ? { opacity: 1 } : { opacity: 0 }
                    }
                    key={index}
                    className={`marker marker-${index}`}
                  />
                ) : (
                  <MarkerYellow
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
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell1[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell1[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell2[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell2[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell3[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell3[1]) ||
                                  (gameState.highlightedCells &&
                                    rowIndex ===
                                      gameState.highlightedCells.cell4[0] &&
                                    columnIndex ===
                                      gameState.highlightedCells.cell4[1])
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
              <BoardLayerWhiteLarge className="board" />
            </div>
            <div className="board__layer black">
              <BoardLayerBlackLarge className="board" />
            </div>
            <Timer
              playerTurn={gameState?.game?.currentPlayer}
              time={gameState.timer}
              winner={gameState.gameWinner}
              isDrawn={gameState.isDrawn}
              restartGame={restartGame}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Board;
