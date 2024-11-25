import React, { useState } from "react";
import "./NoteCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import PaletteIcon from "@mui/icons-material/Palette";

function NoteCard({ title, content }) {
  const [bgColor, setBgColor] = useState("#ffffff"); // Default white color
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const handleColorChange = (event) => {
    setBgColor(event.target.value); // Set background color to selected value
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
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
          onClick={toggleColorPicker}
        />
      </div>
      {isColorPickerVisible && (
        <input
          type="color"
          value={bgColor}
          onChange={handleColorChange}
          className="color-picker"
        />
      )}
    </div>
  );
}

export default NoteCard;
