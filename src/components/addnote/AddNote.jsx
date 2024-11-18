// AddNote.js
import React, { useState } from "react";
import "./AddNote.css";
import axios from "axios";

function AddNote({ onNoteAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    const token = localStorage.getItem("authToken"); // Retrieve the token

    if (!token) {
      setError("Unauthorized access. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/notes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      // Clear the form and notify the parent about the new note
      setFormData({ title: "", content: "" });
      if (onNoteAdded) {
        onNoteAdded(response.data); // Pass the newly added note back to the parent
      }
    } catch (err) {
      setError("Failed to add note. Please try again.");
    }
  };

  return (
    <div className="add-note-container">
      <h3>Add a New Note</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Note Content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;
