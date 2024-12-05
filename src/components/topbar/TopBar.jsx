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

const updateQuery=useContext(UpdateQueryContext)




function TopBar({ toggleDrawer, logout }) {
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
      <SearchIcon sx={{color:'black' }}/>
              <InputBase
                placeholder="Search"
                onChange={(e)=>{updateQuery(e.currentTarget.value)
                   console.log(e.currentTarget.value)}}
                fullWidth
                sx={{ paddingLeft: 1, fontSize: "0.9rem",height:"50px" }}
              />
      <div className="icons">
        <RefreshOutlinedIcon />
        <IndeterminateCheckBoxOutlinedIcon />
        <AppsOutlinedIcon />
        <SettingsIcon />
        {/* AccountBoxOutlinedIcon now handles logout */}
        <IconButton onClick={logout}>
          <AccountBoxOutlinedIcon />{" "}
          {/* Logout will be triggered when clicking AccountBoxOutlinedIcon */}
        </IconButton>
      </div>
    </div>
  );
}

export default TopBar;
