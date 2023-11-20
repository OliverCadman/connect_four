import React from "react";
import { Link } from "react-router-dom";

interface CTAButtonProps {
  classNames: string[];
  isLink: boolean;
  icon?: JSX.Element;
  path?: string;
  state?: {
    [key: string]: string;
  };
  children: React.ReactNode;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  classNames,
  isLink,
  path,
  icon,
  state,
  children,
  onClick,
}) => {
  const classNamesList = classNames.join(" ");
  return isLink && path !== undefined ? (
    <Link to={path} className={`cta-btn ${classNamesList}`} state={state}>
      {children}
      {icon ? <span className="flex">{icon}</span> : ""}
    </Link>
  ) : (
    <button className={`cta-btn ${classNamesList}`} onClick={onClick}>
      {children} {icon ? <span className="flex">{icon}</span> : ""}
    </button>
  );
};

export default CTAButton;
