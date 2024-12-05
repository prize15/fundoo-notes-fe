import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import SearchHook from "./components/SearchHook";

function App() {
  return (
    <SearchHook>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />{" "}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </SearchHook>
  );
}

export default App;
