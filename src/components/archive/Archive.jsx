import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import NoteCard from "../NoteCard";

function Archive() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/api/v1/notes?isArchived=true",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching archived notes", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="archive-container">
      <Typography variant="h5" className="archive-header">
        Archived Notes
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {notes.length === 0 ? (
          <Typography>No archived notes available.</Typography>
        ) : (
          notes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </Box>
    </div>
  );
}

export default Archive;
