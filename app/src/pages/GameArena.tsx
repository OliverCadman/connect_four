import React from "react";
import Board from "../components/GameArena/Board";

const GameArena: React.FC = () => {
  return (
    <main>
      <section className="game-arena__container">
        <Board />
      </section>
    </main>
  );
};

export default GameArena;
