import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import AddNote from "../addnote/AddNote";
import NotesContainer from "../notescontainer/NotesContainer";
import TopBar from "../topbar/TopBar";
import SideBar from "../sidebar/SideBar";
import axios from "axios";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false); // State to control the sidebar
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open); // Toggle sidebar open/close
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/api/v1/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Map through the notes to rename _id to id
        const updatedNotes = response.data.map((note) => ({
          ...note,
          id: note._id, // Rename _id to id
        }));

        setNotes(updatedNotes); // Set the updated notes with id field
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Add the new note to the existing notes
  };

  const handleArchive = async (noteId, archive) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(
        `http://localhost:3000/api/v1/notes/${noteId}/archive`,
        { isArchived: archive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the frontend notes state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, isArchived: archive } : note
        )
      );
    } catch (err) {
      console.error("Failed to update archive status", err);
    }
  };

  const handleTrash = async (noteId, trash) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(
        `http://localhost:3000/api/v1/notes/${noteId}/trash`,
        { isTrashed: trash },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the frontend notes state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, isTrashed: trash } : note
        )
      );
    } catch (err) {
      console.error("Failed to update trash status", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <TopBar toggleDrawer={toggleDrawer} logout={logout} />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <div className="dashboard-container">
        <Routes>
          <Route
            path="/notes"
            element={
              <>
                <AddNote onNoteAdded={handleNoteAdded} />
                <NotesContainer
                  notes={notes}
                  onArchive={handleArchive}
                  onTrash={handleTrash}
                />
              </>
            }
          />
          <Route
            path="/archive"
            element={
              <NotesContainer notes={notes.filter((note) => note.isArchived)} />
            }
          />
          <Route
            path="/trash"
            element={
              <NotesContainer notes={notes.filter((note) => note.isTrashed)} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
