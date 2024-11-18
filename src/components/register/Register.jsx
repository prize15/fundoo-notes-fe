// Register.js
import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters and contain letters and numbers
    return (
      password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with letters and numbers";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit form if no errors
      console.log("Form data:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-box">
        <h2>Fundo</h2>
        <p>Create your Fundo Account</p>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
          <button type="submit">Register</button>
        </form>
        <Link to="/login" className="signin-link">
          Sign in instead
        </Link>
      </div>
      <div className="register-image-box">
        <img src={logo} alt="logo" className="register-logo" />
        <p className="register-info">
          One Account. All of Fundo. Working for you.
        </p>
      </div>
    </div>
  );
}

export default Register;
