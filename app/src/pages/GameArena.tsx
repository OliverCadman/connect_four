import React from "react";
import Board from "../components/GameArena/Board";
import ScoreCard from "../components/GameArena/ScoreCard";
import { AppStateProvider } from "../context/AppStateContext";

const GameArena: React.FC = () => {
  return (
    <AppStateProvider>
      <main>
        <section className="game-arena__container">
          <div className="board__container">
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
      </main>
    </AppStateProvider>
  );
};

export default GameArena;
