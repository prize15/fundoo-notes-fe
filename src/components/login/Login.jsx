// Login.js (Add a check at the top)
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if the user is already logged in
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard/notes");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData
      );
      const token = response.data.token; // Assume the token is returned as `token`
      localStorage.setItem("authToken", token); // Save the token to localStorage
      navigate("/dashboard/notes"); // Redirect to the dashboard
    } catch (err) {
      setErrors({ api: "Login failed. Please check your credentials." });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h2>Fundo</h2>
        <p>Sign in</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {errors.api && <p className="error-text">{errors.api}</p>}
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Create account</Link>
      </div>
    </div>
  );
}

export default Login;
