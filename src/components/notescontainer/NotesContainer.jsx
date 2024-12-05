// NotesContainer.jsx
import React from "react";
import NoteCard from "../notecard/NoteCard";
import "./NotesContainer.css";



const searchQuery=useContext(SearchQueryContext)
    console.log(searchQuery)

function NotesContainer({ notes, onArchive, onTrash }) {
  return (
    <div className="notes-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            isArchived={note.archived}
            isTrashed={note.trashed}
            onArchive={onArchive}
            onTrash={onTrash}
          />
        ))
      ) : (
        <p>No notes available. Start adding some!</p>
      )}
    </div>
  );
}

export default NotesContainer;
