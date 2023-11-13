import React from "react";
import { Player } from "../../models/Player";

interface Props {
  playerTurn?: Player;
  winner?: Player;
  isDrawn?: boolean;
  time: number;
}

const Timer: React.FC<Props> = ({ playerTurn, time, winner, isDrawn }) => {
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
            {!isDrawn ? (
              <>
                <p className="player-info">{winner.playerName}</p>
                <p className="player-result">WINS</p>
              </>
            ) : (
              <p className="player-result">DRAW</p>
            )}
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
