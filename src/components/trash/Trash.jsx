import React, { useState, useEffect } from "react";
import axios from "axios";
import NotesContainer from "../notescontainer/NotesContainer";

function Trash() {
  const [trashedNotes, setTrashedNotes] = useState([]);

  useEffect(() => {
    const fetchTrashedNotes = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/notes/trashed",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Trashed Notes Response:", response.data);

        setTrashedNotes(response.data || []);
      } catch (err) {
        console.error("Failed to fetch trashed notes", err);
      }
    };

    fetchTrashedNotes();
  }, []);

  console.log("Trashed Notes:", trashedNotes); // Add this log

  return (
    <div className="trash-container">
      <h2>Trashed Notes</h2>
      <NotesContainer notes={trashedNotes} />
    </div>
  );
}

export default Trash;
