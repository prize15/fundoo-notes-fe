// NotesContainer.js
import React from "react";
import NoteCard from "../notecard/NoteCard";
import "./NotesContainer.css";

function NotesContainer({ notes }) {
  return (
    <div className="notes-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard key={note.id} title={note.title} content={note.content} />
        ))
      ) : (
        <p>No notes available. Start adding some!</p>
      )}
    </div>
  );
}

export default NotesContainer;
