import React from "react";
import { ReactComponent as PlayerOneIcon } from "../../assets/images/player-one.svg";
import { ReactComponent as PlayerTwoIcon } from "../../assets/images/player-two.svg";

interface Props {
  player: string;
}

const ScoreCard: React.FC<Props> = ({ player }) => {
  return (
    <div className="scorecard__wrapper">
      <div className="scorecard">
        <h2>Player</h2>
        <p>Score</p>
        <div
          className={`player-icon__container ${
            player === "playerOne" ? "player-one" : "player-two"
          }`}
        >
          {player === "playerOne" ? <PlayerOneIcon /> : <PlayerTwoIcon />}
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
