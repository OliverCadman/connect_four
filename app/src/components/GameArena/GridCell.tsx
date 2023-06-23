import React, { BaseSyntheticEvent } from "react";
import { ReactComponent as MarkerRed } from "../../assets/images/marker-red.svg";

interface Props {
  columnIndex: number;
  rowIndex: number;
  handleMouseOver?: (e: BaseSyntheticEvent) => void;
  handleMouseOut?: () => void;
  children: React.ReactNode;
}

const GridCell: React.FC<Props> = ({
  rowIndex,
  columnIndex,
  handleMouseOver,
  handleMouseOut,
  children,
}) => {
  return (
    <div
      className={`grid-cell grid-cell-${columnIndex}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </div>
  );
};

export default GridCell;
