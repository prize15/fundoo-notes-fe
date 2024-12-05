import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

function SideBar({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    toggleDrawer();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      className="sidebar-drawer"
      BackdropProps={{
        style: { backgroundColor: "transparent" }, // Transparent background
      }}
      PaperProps={{
        style: {
          marginTop: "60px", // Height of the TopBar
          height: "calc(100% - 60px)",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => handleNavigation("/Dashboard/Notes")}>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation("/Dashboard/Archive")}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation("/Dashboard/Trash")}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideBar;
