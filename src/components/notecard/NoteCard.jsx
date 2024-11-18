// NoteCard.js
import React from "react";
import "./NoteCard.css";

function NoteCard({ title, content }) {
  return (
    <div className="note-card">
      <h3 className="note-title">{title}</h3>
      <p className="note-content">{content}</p>
      <div className="note-actions">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
