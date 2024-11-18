// Dashboard.js
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import NoteCard from "../notecard/NoteCard";
import AddNote from "../addnote/AddNote";
import axios from "axios";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve the token

      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/notes", {
          headers: { Authorization: `Bearer ${token}` }, // Attach the token
        });
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <AddNote onNoteAdded={handleNoteAdded} />
      <div className="notes-list">
        {notes.map((note) => (
          <NoteCard key={note.id} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
