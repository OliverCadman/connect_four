import React, { BaseSyntheticEvent } from "react";
import { ReactComponent as MarkerRed } from "../../assets/images/marker-red.svg";

interface Props {
  columnIndex: number;
  rowIndex: number;
  handleMouseOver?: (e: BaseSyntheticEvent) => void;
  handleMouseOut?: () => void;
  handleClick: (columnIndex: number) => void;
  children: React.ReactNode;
}

const GridCell: React.FC<Props> = ({
  rowIndex,
  columnIndex,
  handleMouseOver,
  handleMouseOut,
  children,
  handleClick,
}) => {
  return (
    <div
      className={`grid-cell grid-cell-${columnIndex}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => handleClick(columnIndex)}
    >
      {children}
    </div>
  );
};

export default GridCell;
