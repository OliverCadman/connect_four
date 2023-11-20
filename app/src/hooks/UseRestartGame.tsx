import { useGameContext } from "../context/GameDataContext";
import { Board as Gameboard } from "../models/Board";

export const useRestartGame = () => {
  const { setGameState } = useGameContext();
  console.log("hello");
  return setGameState((prevGameState) => {
    return {
      ...prevGameState,
      game: new Gameboard(prevGameState.game?.playerTwo.playerName === "CPU"),
      isGameOver: false,
      gameWinner: undefined,
      highlightedCells: undefined,
    };
  });
};
