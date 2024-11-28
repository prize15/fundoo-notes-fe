import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AddNote from "../addnote/AddNote";
import NotesContainer from "../notescontainer/NotesContainer";
import TopBar from "../topbar/TopBar";
import axios from "axios";
import SideBar from "../sidebar/SideBar";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false); // State to control the sidebar

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
    <div>
      <TopBar toggleDrawer={toggleDrawer} /> {/* Pass toggleDrawer to TopBar */}
      <SideBar open={open} toggleDrawer={toggleDrawer} />{" "}
      {/* Pass open and toggleDrawer to SideBar */}
      <div className="dashboard-container">
        <AddNote onNoteAdded={handleNoteAdded} />
        <NotesContainer notes={notes} />
      </div>
    </div>
  );
}

export default Dashboard;
