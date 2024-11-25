import React, { useState } from "react";
import "./NoteCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import PaletteIcon from "@mui/icons-material/Palette";

function NoteCard({ title, content }) {
  const [bgColor, setBgColor] = useState("#ffffff"); // Default white color
  const [isPaletteVisible, setIsPaletteVisible] = useState(false);

  // List of predefined colors
  const colors = [
    "#ffffff", // White
    "#f28b82", // Red
    "#fbbc04", // Yellow
    "#fff475", // Light Yellow
    "#ccff90", // Green
    "#a7ffeb", // Teal
    "#d7aefb", // Purple
    "#fdcfe8", // Pink
  ];

  const handleColorChange = (color) => {
    setBgColor(color); // Set the selected background color
    setIsPaletteVisible(false); // Close the palette after selection
  };

  const togglePalette = () => {
    setIsPaletteVisible(!isPaletteVisible);
  };

  return (
    <div className="note-card" style={{ backgroundColor: bgColor }}>
      <h3 className="note-title">{title}</h3>
      <p className="note-content">{content}</p>
      <div className="note-actions">
        <EditIcon className="action-icon edit-icon" />
        <DeleteIcon className="action-icon delete-icon" />
        <ArchiveIcon className="action-icon archive-icon" />
        <PaletteIcon
          className="action-icon palette-icon"
          onClick={togglePalette}
        />
      </div>
      {isPaletteVisible && (
        <div className="color-palette">
          {colors.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteCard;
