import React, { useState, useContext, createContext } from "react";

import { Board as GameBoard } from "../models/Board";
import { Player } from "../models/Player";

interface IGameData {
  game: GameBoard | undefined;
  isGameOver: boolean;
  gameWinner: Player | undefined;
  isDrawn: boolean;
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
  const [gameState, setGameState] = useState<IGameData>({
    game: new GameBoard(true),
    isGameOver: false,
    gameWinner: undefined,
    isDrawn: false,
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameContext = () =>
  useContext(GameStateContext) as GameStateContextType;