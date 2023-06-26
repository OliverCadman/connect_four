import React from "react";
import { ReactComponent as LogoIcon } from "../../assets/images/logo.svg";

const Header: React.FC = () => {
  return (
    <div className="header__container">
      <button className="menu-btn__wrapper header__btn">Menu</button>
      <div className="logo__wrapper">
        <LogoIcon />
      </div>
      <button className="restart-btn__wrapper header__btn">Restart</button>
    </div>
  );
};

export default Header;
