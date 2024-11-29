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
  const navigate = useNavigate(); // Use the `useNavigate` hook for redirection

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
        setNotes(response.data || []); // Default to empty array if no data
      } catch (err) {
        console.error("Failed to fetch notes", err);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Add the new note to the existing notes
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the auth token from localStorage
    navigate("/login"); // Redirect to the login page
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
                <NotesContainer notes={notes} />
              </>
            }
          />
          <Route
            path="/archive"
            element={
              <NotesContainer notes={notes.filter((note) => note.archived)} />
            }
          />
          <Route
            path="/trash"
            element={
              <NotesContainer notes={notes.filter((note) => note.trashed)} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
