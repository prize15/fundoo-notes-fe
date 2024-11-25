import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  IconButton,
  Box,
  Collapse,
  Typography,
  CircularProgress,
  Paper,
  Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "./AddNote.css";

function AddNote({ onNoteAdded }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const noteRef = useRef(null);

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
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/notes",
        note,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onNoteAdded(response.data);
      setNote({ title: "", content: "" });
      setIsExpanded(false);
    } catch (err) {
      console.error("Failed to add note", err);
      setError("Failed to add note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="add-note-container" ref={noteRef}>
      {!isExpanded ? (
        <Box
          className="add-note-placeholder"
          onClick={() => setIsExpanded(true)}
        >
          <Typography variant="body1" color="textSecondary">
            Take a Note...
          </Typography>
          <IconButton aria-label="expand" color="primary">
            <AddIcon />
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
              size="small"
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
              rows={3}
              margin="normal"
              size="small"
            />
            <Box className="form-actions">
              <IconButton
                type="submit"
                color="primary"
                aria-label="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : <CheckIcon />}
              </IconButton>
            </Box>
          </form>
          <Fade in={error !== ""}>
            <Typography color="error" className="error-text">
              {error}
            </Typography>
          </Fade>
        </Collapse>
      )}
    </Paper>
  );
}

export default AddNote;
