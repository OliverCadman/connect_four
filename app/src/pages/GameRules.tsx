import React from "react";
import PanelContainer from "../components/shared/PanelContainer";
import { ReactComponent as CheckIcon } from "../assets/images/icon-check.svg";
import { Link } from "react-router-dom";

const GameRules: React.FC = () => {
  return (
    <div className="flex centered h-100">
      <PanelContainer isCTAPanel={false}>
        <div className="gamerule-panel__header">
          <h1>RULES</h1>
        </div>
        <div className="gamerule-panel__rules">
          <h2>Objective</h2>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="gamerule-panel__rules steps">
          <h2>How to Play</h2>
          <ol>
            <li>
              <span>Red goes first in the first game.</span>
            </li>
            <li>
              <span>
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </span>
            </li>
            <li>
              <span>
                The game ends when there is a 4-in-a-row or a stalemate.
              </span>
            </li>
            <li>
              <span>
                The starter of the previous game goes second on the next game.
              </span>
            </li>
          </ol>
        </div>
        <div className="check-icon__wrapper">
          <Link to="/connect_four/">
            <CheckIcon aria-label="Go back to home page" role="img" />
          </Link>
        </div>
      </PanelContainer>
    </div>
  );
};

export default GameRules;
