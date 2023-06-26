import React from "react";
import { ReactComponent as PlayerOneIcon } from "../../assets/images/player-one.svg";
import { ReactComponent as PlayerTwoIcon } from "../../assets/images/player-two.svg";

interface Props {
  player: string;
}

const ScoreCard: React.FC<Props> = ({ player }) => {
  return (
    <div
      className={`scorecard__wrapper ${
        player === "playerOne" ? "player-one" : "player-two"
      }`}
    >
      <div
        className={`scorecard ${
          player === "playerOne" ? "player-one" : "player-two"
        }`}
      >
        <h2>Player</h2>
        <p>0</p>
      </div>
      <div
        className={`player-icon__container ${
          player === "playerOne" ? "player-one" : "player-two"
        }`}
      >
        {player === "playerOne" ? <PlayerOneIcon /> : <PlayerTwoIcon />}
      </div>
    </div>
  );
};

export default ScoreCard;
