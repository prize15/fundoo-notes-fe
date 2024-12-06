import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Collapse, Typography, CircularProgress, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./AddNote.css";

function AddNote({ onNoteAdded, editNote, onNoteUpdated }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const noteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editNote) {
      setNote(editNote);
      setIsExpanded(true); // Expand when editing a note
    }
  }, [editNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("authToken");

    try {
      if (editNote) {
        // Update existing note
        const response = await axios.put(
          `http://localhost:3000/api/v1/notes/${editNote.id}`,
          note,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onNoteUpdated(response.data);
      } else {
        // Add new note
        const response = await axios.post(
          "http://localhost:3000/api/v1/notes",
          note,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onNoteAdded(response.data);
      }

      setNote({ title: "", content: "" });
      setIsExpanded(false);
    } catch (err) {
      console.error("Failed to save note", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={2}
      className="note-input-container"
      ref={noteRef}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <form onSubmit={handleAddOrUpdateNote} className="note-form">
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
            <button type="submit" className="icon-button" disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
            </button>
          </div>
        </form>
        {error && (
          <Typography color="error" className="error-text">
            {error}
          </Typography>
        )}
      </Collapse>
    </Paper>
  );
}

export default AddNote;
