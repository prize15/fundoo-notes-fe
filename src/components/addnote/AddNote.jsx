import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./AddNote.css";

function AddNote({ onNoteAdded, editNote, onNoteUpdated }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State to manage modal visibility

  const inputRef = useRef(null);

  useEffect(() => {
    if (editNote) {
      setNote(editNote);
      setOpen(true); // Open the modal when editing a note
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
      setOpen(false); // Close modal after save
    } catch (err) {
      console.error("Failed to save note", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the modal when canceled
  };

  return (
    <div>
      {/* Modal for Add or Edit Note */}
      <Modal open={open} onClose={handleClose}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editNote ? "Edit Note" : "Add a Note"}</DialogTitle>
          <DialogContent>
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
            </form>
            {error && (
              <Typography color="error" className="error-text">
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddOrUpdateNote}
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
    </div>
  );
}

export default AddNote;
