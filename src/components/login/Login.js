// Login.js
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // Track API error message
  const navigate = useNavigate(); // To navigate after successful login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email and password
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      // If no validation errors, make API call
      try {
        setLoading(true); // Set loading to true before API call
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          formData
        );

        if (response.status === 200) {
          // Successfully logged in
          console.log("Login successful:", response.data);
          // Optionally store JWT token or user info in localStorage or context
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/dashboard"); // Redirect to dashboard after successful login
        }
      } catch (error) {
        setLoading(false); // Reset loading state
        if (error.response) {
          // If the server responded with an error
          setErrorMessage(error.response.data.message || "Login failed");
        } else {
          // If no response from the server
          setErrorMessage("Network error, please try again later.");
        }
      }
    } else {
      // Set validation errors
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h2>Fundo</h2>
        <p>Sign in</p>
        <p>Use your Fundo Account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {errorMessage && <p className="error-text">{errorMessage}</p>}{" "}
          {/* Display API error */}
          <div className="login-options">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/register">Create account</Link>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
