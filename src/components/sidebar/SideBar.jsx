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
import { useNavigate } from "react-router-dom";

function SideBar({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    toggleDrawer();
  };

  return (
    <div>
      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleNavigation("/Notes")}>
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>

          <ListItem button onClick={() => handleNavigation("/Archive")}>
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>

          <ListItem button onClick={() => handleNavigation("/Trash")}>
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

export default SideBar;
