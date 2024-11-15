// Dashboard.js
import React from "react";
import "./Dashboard.css";
import NoteCard from "../notecard/NoteCard"; // Import NoteCard component

function Dashboard() {
  // Example note data, you could fetch this from an API
  const notes = [
    { id: 1, title: "Note 1", content: "This is note 1" },
    { id: 2, title: "Note 2", content: "This is note 2" },
    { id: 3, title: "Note 3", content: "This is note 3" },
  ];

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <NoteCard key={note.id} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
