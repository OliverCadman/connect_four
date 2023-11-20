import React from "react";
import { ReactComponent as LogoIcon } from "../../assets/images/logo.svg";
import { useGameContext } from "../../context/GameDataContext";
import { useAppStateContext } from "../../context/AppStateContext";
import { Board as Gameboard } from "../../models/Board";

const Header: React.FC = () => {
  const { setGameState } = useGameContext();
  const { appState, setAppState } = useAppStateContext();
  return (
    <div className="header__container">
      <button
        className="menu-btn__wrapper header__btn"
        onClick={() => {
          setAppState({ ...appState, showMenu: !appState.showMenu });
          setGameState((prevGameState) => {
            return {
              ...prevGameState,
              timerPaused: true,
            };
          });
        }}
      >
        Menu
      </button>
      <div className="logo__wrapper">
        <LogoIcon />
      </div>
      <button
        className="restart-btn__wrapper header__btn"
        onClick={() => {
          setGameState((prevGameState) => {
            return {
              ...prevGameState,
              game: new Gameboard(
                prevGameState.game?.playerTwo.playerName === "CPU"
              ),
              isGameOver: false,
              gameWinner: undefined,
              highlightedCells: undefined,
              timerPaused: undefined,
            };
          });
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default Header;
