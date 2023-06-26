import React from "react";

import { ReactComponent as CounterRedLarge } from "../../assets/images/counter-red-large.svg";
import { ReactComponent as CounterYellowLarge } from "../../assets/images/counter-yellow-large.svg";
import { ReactComponent as CounterRedSmall } from "../../assets/images/counter-red-small.svg";
import { ReactComponent as CounterYellowSmall } from "../../assets/images/counter-yellow-small.svg";

interface Props {
  color: string;
  isMobileDevice: boolean;
}

const Counter: React.FC<Props> = ({ color, isMobileDevice }) => {
  if (isMobileDevice) {
    return (
      <>
        {color === "red" ? (
          <CounterRedSmall className="counter" />
        ) : (
          <CounterYellowSmall className="counter" />
        )}
      </>
    );
  } else {
    return (
      <>
        {color === "red" ? (
          <CounterRedLarge className="counter" />
        ) : (
          <CounterYellowLarge className="counter" />
        )}
      </>
    );
  }
};

export default Counter;
