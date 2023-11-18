import React, { useState, useContext, createContext } from "react";

import { Board as GameBoard } from "../models/Board";
import { Counter } from "../models/Counter";
import { Player } from "../models/Player";

interface IGameData {
  game?: GameBoard;
  isGameOver: boolean;
  gameWinner?: Player;
  isDrawn: boolean;
  gameMode?: string;
  gameBoard?: (Counter | null)[][];
}

type GameStateContextType = {
  gameState: IGameData;
  setGameState: React.Dispatch<React.SetStateAction<IGameData>>;
};

interface Props {
  children: React.ReactNode;
}

const GameStateContext = createContext<GameStateContextType | null>(null);

export const GameStateProvider: React.FC<Props> = ({ children }) => {
  const initalizedGame = new GameBoard(true);
  const [gameState, setGameState] = useState<IGameData>({
    game: new GameBoard(true),
    isGameOver: false,
    gameWinner: undefined,
    isDrawn: false,
    gameMode: localStorage.getItem("game_mode") || undefined,
    gameBoard: initalizedGame.getBoard(),
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameContext = () =>
  useContext(GameStateContext) as GameStateContextType;
