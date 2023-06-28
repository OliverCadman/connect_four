import React from "react";
import { Player } from "../../models/Player";

interface Props {
  playerTurn: Player | undefined;
  winner: Player | undefined;
  time: number;
}

const Timer: React.FC<Props> = ({ playerTurn, time, winner }) => {
  return (
    <div className="timer__container">
      {!winner ? (
        <div
          className={`timer__wrapper ${
            playerTurn?.color === "red" ? "red-bg" : "yellow-bg"
          }`}
        >
          <div className="timer__content">
            <p className="player-info">{playerTurn?.playerName}'s Turn</p>
            <p className="time-left">{time > 0 ? `${time}s` : "0s"}</p>
          </div>
        </div>
      ) : (
        <div className="timer__wrapper game-over">
          <div className="timer__wrapper-content">
            <p className="player-info">{winner.playerName}</p>
            <p className="player-result">WINS</p>
          </div>
          <div className="restart-btn__container">
            <button type="button" className="restart-btn">
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
