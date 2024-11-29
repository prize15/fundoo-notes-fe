import React from "react";
import "./TopBar.css";
import logo2 from "../../assets/logo2.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

function TopBar({ toggleDrawer }: { toggleDrawer: () => void }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <img src={logo2} alt="Fundo logo" className="topbar-logo" />
        <h3 className="topbar-title">Fundo</h3>
      </div>
      <input type="text" placeholder="Search" className="topbar-search" />
      <div className="icons">
        <RefreshOutlinedIcon />
        <IndeterminateCheckBoxOutlinedIcon />
        <AppsOutlinedIcon />
        <SettingsIcon />
        <AccountBoxOutlinedIcon />
      </div>
    </div>
  );
}

export default TopBar;
