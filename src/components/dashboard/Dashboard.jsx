// Dashboard.js
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AddNote from "../addnote/AddNote";
import NotesContainer from "../notescontainer/NotesContainer";
import axios from "axios";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/api/v1/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Add the new note to the existing notes
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <AddNote onNoteAdded={handleNoteAdded} />
      <NotesContainer notes={notes} />
    </div>
  );
}

export default Dashboard;
