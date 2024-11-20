// AddNote.js
import React, { useState } from "react";
import axios from "axios";
import "./AddNote.css";

function AddNote({ onNoteAdded }) {
  const [note, setNote] = useState({ title: "", content: "" });

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
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };

  return (
    <form className="add-note-form" onSubmit={handleAddNote}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={note.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNote;
