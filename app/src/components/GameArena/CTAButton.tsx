import React from "react";
import { Link } from "react-router-dom";

interface CTAButtonProps {
  classNames: string[];
  text: string;
  isLink: boolean;
  icon?: JSX.Element;
  path?: string;
  state?: {
    [key: string]: string;
  };
}

const CTAButton: React.FC<CTAButtonProps> = ({
  classNames,
  text,
  isLink,
  path,
  icon,
  state,
}) => {
  const classNamesList = classNames.join(" ");
  return isLink && path !== undefined ? (
    <Link to={path} className={`cta-btn ${classNamesList}`} state={state}>
      {text}
      {icon ? <span className="flex">{icon}</span> : ""}
    </Link>
  ) : (
    <button className={`cta-btn ${classNamesList}`}>
      {text} {icon ? <span className="flex">{icon}</span> : ""}
    </button>
  );
};

export default CTAButton;
