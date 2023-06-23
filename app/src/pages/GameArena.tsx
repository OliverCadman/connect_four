import React from "react";
import Board from "../components/GameArena/Board";
import { AppStateProvider } from "../context/AppStateContext";

const GameArena: React.FC = () => {
  return (
    <AppStateProvider>
      <main>
        <section className="game-arena__container">
          <Board />
        </section>
      </main>
    </AppStateProvider>
  );
};

export default GameArena;
