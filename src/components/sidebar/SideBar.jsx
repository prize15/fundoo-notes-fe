import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false); // Close the drawer after navigation
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Hamburger Icon aligned to the left */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        style={{ marginLeft: 0 }} // Ensure it stays at the left
      >
        <MenuIcon />
      </IconButton>
      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleNavigation("/archive")}>
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/trash")}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
export default Sidebar;
