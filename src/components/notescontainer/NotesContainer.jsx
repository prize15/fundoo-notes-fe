import React, { useContext } from "react";
import NoteCard from "../notecard/NoteCard";
import "./NotesContainer.css";
import { SearchQueryContext } from "../../components/SearchHook";

function NotesContainer({ notes, onArchive, onTrash, onEditNote }) {
  const searchQuery = useContext(SearchQueryContext);

  // Filter notes by search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="notes-container">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            isArchived={note.archived}
            isTrashed={note.trashed}
            onArchive={onArchive}
            onTrash={onTrash}
            onEditNote={onEditNote}
          />
        ))
      ) : (
        <p>No notes match your search.</p>
      )}
    </div>
  );
}

export default NotesContainer;
