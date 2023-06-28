import React from "react";
import { Player } from "../../models/Player";

interface Props {
  playerTurn: Player | undefined;
}

const Timer: React.FC<Props> = ({ playerTurn }) => {
  return (
    <div className="timer__container">
      <div
        className={`timer__wrapper ${
          playerTurn?.color === "red" ? "red-bg" : "yellow-bg"
        }`}
      ></div>
    </div>
  );
};

export default Timer;
