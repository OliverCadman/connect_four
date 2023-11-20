import React from "react";
import Board from "../components/GameArena/Board";
import ScoreCard from "../components/GameArena/ScoreCard";
import Header from "../components/GameArena/Header";
import BottomBorder from "../components/GameArena/BottomBorder";

import { useGameContext } from "../context/GameDataContext";
import { useAppStateContext } from "../context/AppStateContext";
import Menu from "../components/GameArena/Menu";

const GameArena: React.FC = () => {
  const { gameState } = useGameContext();
  const { appState } = useAppStateContext();

  return (
    <>
      <main className="border__wrapper game-bg">
        <section className="game-arena__container">
          <div className="header-hidden-md">
            <Header />
          </div>
          <div className="board__container">
            <div className="header-hidden-lg">
              <Header />
            </div>
            <div className="scorecard__container-sm">
              <ScoreCard player={gameState.game?.playerOne} />
              <ScoreCard player={gameState.game?.playerTwo} />
            </div>

            <div className="scorecard-hidden-md player-one">
              <ScoreCard player={gameState.game?.playerOne} />
            </div>
            <div className="scorecard-hidden-md player-two">
              <ScoreCard player={gameState.game?.playerTwo} />
            </div>
            <Board />
          </div>
        </section>
        <BottomBorder winningPlayer={gameState.gameWinner?.playerName} />
      </main>
      {appState.showMenu ? (
        <>
          <Menu /> <div className="opaque-overlay"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default GameArena;
