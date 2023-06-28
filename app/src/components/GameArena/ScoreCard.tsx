import React from "react";
import { ReactComponent as PlayerOneIcon } from "../../assets/images/player-one.svg";
import { ReactComponent as PlayerTwoIcon } from "../../assets/images/player-two.svg";
import { Player } from "../../models/Player";

interface Props {
  player: Player | undefined;
}

const ScoreCard: React.FC<Props> = ({ player }) => {
  return (
    <div
      className={`scorecard__wrapper ${
        player?.playerName === "Player 1" ? "player-one" : "player-two"
      }`}
    >
      <div
        className={`scorecard ${
          player?.playerName === "Player 1" ? "player-one" : "player-two"
        }`}
      >
        <h2>{player?.playerName}</h2>
        <p>{player?.score}</p>
      </div>
      <div
        className={`player-icon__container ${
          player?.playerName === "Player 1" ? "player-one" : "player-two"
        }`}
      >
        {player?.playerName === "Player 1" ? (
          <PlayerOneIcon />
        ) : (
          <PlayerTwoIcon />
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
