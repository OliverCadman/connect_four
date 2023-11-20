import CTAPanel from "../components/CTAPanel";
import { useEffect } from "react";
import { useAppStateContext } from "../context/AppStateContext";
import { useGameContext } from "../context/GameDataContext";

import { Board as Gameboard } from "../models/Board";

const Home = () => {
  const { appState, setAppState } = useAppStateContext();
  const { setGameState } = useGameContext();

  useEffect(() => {
    if (appState.showMenu) {
      setAppState((prevAppState) => {
        return {
          ...prevAppState,
          showMenu: false,
        };
      });
    }

    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        game: new Gameboard(prevGameState.game?.playerTwo.playerName === "CPU"),
        isGameOver: false,
        gameWinner: undefined,
        highlightedCells: undefined,
        timerPaused: undefined,
      };
    });
  }, []);

  return (
    <main className="flex centered h-100 home-bg">
      <CTAPanel />
    </main>
  );
};

export default Home;
