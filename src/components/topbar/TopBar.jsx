import React from "react";
import "./TopBar.css";
import logo2 from "../../assets/logo2.svg";

function TopBar() {
  return (
    <div className="topbar">
      <img src={logo2} alt="Fundo logo" className="topbar-logo" />
    </div>
  );
}

export default TopBar;
