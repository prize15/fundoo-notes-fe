import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Collapse,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import "./AddNote.css";

function AddNote({ onNoteAdded }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const noteRef = useRef(null);
  const inputRef = useRef(null);

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
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleFocus = () => {
    setIsExpanded(true);
    // Focus the title input when expanding
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <Paper
      elevation={2}
      className="note-input-container"
      ref={noteRef}
      onClick={!isExpanded ? handleFocus : undefined}
    >
      {!isExpanded ? (
        <Box className="note-input-collapsed">
          <input
            placeholder="Take a note..."
            className="note-input-placeholder"
            readOnly
          />
          <div className="note-actions">
            <button className="icon-button" aria-label="Check">
              <CheckCircleIcon />
            </button>
            <button className="icon-button" aria-label="Create">
              <CreateIcon />
            </button>
            <button className="icon-button" aria-label="Add image">
              <ImageIcon />
            </button>
          </div>
        </Box>
      ) : (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <form onSubmit={handleAddNote} className="note-form">
            <input
              ref={inputRef}
              type="text"
              name="title"
              placeholder="Title"
              value={note.title}
              onChange={handleChange}
              className="note-input"
            />
            <textarea
              name="content"
              placeholder="Take a note..."
              value={note.content}
              onChange={handleChange}
              className="note-textarea"
              rows={3}
            />
            <div className="note-actions expanded">
              <button
                type="submit"
                className="icon-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <CheckCircleIcon />
                )}
              </button>
              <button type="button" className="icon-button">
                <CreateIcon />
              </button>
              <button type="button" className="icon-button">
                <ImageIcon />
              </button>
            </div>
          </form>
          {error && (
            <Typography color="error" className="error-text">
              {error}
            </Typography>
          )}
        </Collapse>
      )}
    </Paper>
  );
}

export default AddNote;
