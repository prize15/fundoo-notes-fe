import React, { useContext } from "react";
import "./TopBar.css";
import logo2 from "../../assets/logo2.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { UpdateQueryContext } from "../../components/SearchHook";

function TopBar({ toggleDrawer, logout }) {
  const updateQuery = useContext(UpdateQueryContext);

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
      <div className="topbar-search">
        <InputBase
          placeholder="Search"
          onChange={(e) => updateQuery(e.target.value)}
          sx={{ paddingLeft: 1, fontSize: "0.9rem" }}
        />
      </div>
      <div className="icons">
        <RefreshOutlinedIcon />
        <IndeterminateCheckBoxOutlinedIcon />
        <AppsOutlinedIcon />
        <SettingsIcon />
        <IconButton onClick={logout}>
          <AccountBoxOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TopBar;
