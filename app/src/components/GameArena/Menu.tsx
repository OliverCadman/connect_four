import CTAButton from "./CTAButton";
import PanelContainer from "../shared/PanelContainer";
import { Board as Gameboard } from "../../models/Board";
import { useAppStateContext } from "../../context/AppStateContext";
import { useGameContext } from "../../context/GameDataContext";

const Menu = () => {
  const { setAppState } = useAppStateContext();
  const { setGameState } = useGameContext();

  const restartGame = () => {
    return setGameState((prevGameState) => {
      return {
        ...prevGameState,
        game: new Gameboard(prevGameState.game?.playerTwo.playerName === "CPU"),
        isGameOver: false,
        gameWinner: undefined,
        highlightedCells: undefined,
        timerPaused: undefined,
      };
    });
  };

  const closeMenu = () => {
    setAppState((prevAppState) => {
      return {
        ...prevAppState,
        showMenu: false,
      };
    });
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        timerPaused: false,
      };
    });
  };
  return (
    <div className="menu__container">
      <PanelContainer isCTAPanel={true}>
        {" "}
        <h2>Pause</h2>
        <div className="menu__btn-list flex justify-center">
          <menu>
            <li>
              <CTAButton
                isLink={false}
                classNames={[
                  "btn-white",
                  "border-shadowed",
                  "flex",
                  "centered",
                ]}
                onClick={closeMenu}
              >
                CONTINUE GAME
              </CTAButton>
            </li>
            <li>
              <CTAButton
                isLink={false}
                classNames={[
                  "btn-white",
                  "border-shadowed",
                  "flex",
                  "centered",
                ]}
                onClick={() => {
                  restartGame();
                  closeMenu();
                }}
              >
                RESTART
              </CTAButton>
            </li>
            <li>
              <CTAButton
                isLink={true}
                classNames={[
                  "btn-pink",
                  "border-shadowed",
                  "quit-btn",
                  "flex",
                  "centered",
                ]}
                path="/connect_four/"
              >
                QUIT GAME
              </CTAButton>
            </li>
          </menu>
        </div>
      </PanelContainer>
    </div>
  );
};

export default Menu;
