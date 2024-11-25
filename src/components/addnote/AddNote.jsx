// AddNote.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  IconButton,
  Box,
  Collapse,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./AddNote.css";

function AddNote({ onNoteAdded }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const noteRef = useRef(null); // Reference to the component for detecting clicks outside

  // Close the form if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/notes",
        note,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Notify parent component of the newly added note
      onNoteAdded(response.data);

      // Clear input fields
      setNote({ title: "", content: "" });
      setIsExpanded(false); // Collapse after submission
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };

  return (
    <Box className="add-note-container" ref={noteRef}>
      {!isExpanded ? (
        <Box
          className="add-note-placeholder"
          onClick={() => setIsExpanded(true)}
        >
          <Typography variant="h6">Take a Note</Typography>
          <IconButton aria-label="expand">
            <EditIcon />
          </IconButton>
        </Box>
      ) : (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <form className="add-note-form" onSubmit={handleAddNote}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={note.title}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Content"
              variant="outlined"
              name="content"
              value={note.content}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
            />
            <IconButton
              type="submit"
              color="primary"
              aria-label="submit"
              className="submit-btn"
            >
              <CheckIcon />
            </IconButton>
          </form>
        </Collapse>
      )}
    </Box>
  );
}

export default AddNote;
