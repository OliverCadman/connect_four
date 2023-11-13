import React from "react";

interface BottomBorderProps {
  winningPlayer?: string;
}

const BottomBorder: React.FC<BottomBorderProps> = ({ winningPlayer }) => {
  return (
    <div
      className={`bottom-border ${
        winningPlayer === "Player 1"
          ? "bottom-border-pink"
          : winningPlayer === "CPU" || winningPlayer === "Player 2"
          ? "bottom-border-yellow"
          : ""
      }`}
    ></div>
  );
};

export default BottomBorder;
