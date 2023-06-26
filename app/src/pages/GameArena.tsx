import React from "react";
import Board from "../components/GameArena/Board";
import ScoreCard from "../components/GameArena/ScoreCard";
import Header from "../components/GameArena/Header";
import BottomBorder from "../components/GameArena/BottomBorder";
import { AppStateProvider } from "../context/AppStateContext";

const GameArena: React.FC = () => {
  return (
    <AppStateProvider>
      <main className="main-bg">
        <section className="game-arena__container">
          <div className="header-hidden-md">
            <Header />
          </div>
          <div className="board__container">
            <div className="header-hidden-lg">
              <Header />
            </div>
            <div className="scorecard__container-sm">
              <ScoreCard player="playerOne" />
              <ScoreCard player="playerTwo" />
            </div>

            <div className="scorecard-hidden-md player-one">
              <ScoreCard player="playerOne" />
            </div>
            <div className="scorecard-hidden-md player-two">
              <ScoreCard player="playerTwo" />
            </div>
            <Board />
          </div>
        </section>
        <BottomBorder />
      </main>
    </AppStateProvider>
  );
};

export default GameArena;
