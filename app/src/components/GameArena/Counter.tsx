import React from "react";

import { ReactComponent as CounterRedLarge } from "../../assets/images/counter-red-large.svg";
import { ReactComponent as CounterYellowLarge } from "../../assets/images/counter-yellow-large.svg";
import { ReactComponent as CounterRedSmall } from "../../assets/images/counter-red-small.svg";
import { ReactComponent as CounterYellowSmall } from "../../assets/images/counter-yellow-small.svg";

interface Props {
  color: string;
  isMobileDevice: boolean;
  isHighlighted: boolean | undefined;
}

const Counter: React.FC<Props> = ({ color, isMobileDevice, isHighlighted }) => {
  console.log("IS COUNTER HIGHLIGHTED???", isHighlighted);
  if (isMobileDevice) {
    return (
      <div className="counter__wrapper">
        {isHighlighted && <div className="donut-highlight"></div>}
        {color === "red" ? (
          <CounterRedSmall className="counter" />
        ) : (
          <CounterYellowSmall className="counter" />
        )}
      </div>
    );
  } else {
    return (
      <div className="counter__wrapper">
        {isHighlighted && <div className="donut-highlight"></div>}
        {color === "red" ? (
          <CounterRedLarge className="counter" />
        ) : (
          <CounterYellowLarge className="counter" />
        )}
      </div>
    );
  }
};

export default Counter;
