import React, { useState } from "react";

// CSS imports
import "./login.css";

// Image imports
import Logo from "../../img/queens_logo.png";
import { Link } from "react-router-dom";
import request from "../../utils/Request";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState();

  async function login() {
    // make a login request to backend
    const data = await request("POST", "auth/login", {
      email: email,
      password: pass,
    });

    if (data.success && data.body.token) {
      // Save any other information needed on frontend here
      window.localStorage.setItem(
        "user",
        JSON.stringify({ token: data.body.token })
      );
      window.dispatchEvent(new Event("storage"));
    } else {
      // login failed
      setError(data.body);
    }
  }

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="login-header-container">
          <img height={80} src={Logo} alt="" />
          <h2>Queen's Rapid Response Tool</h2>
        </div>
        <div className="login-body-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="login-form"
          >
            <label htmlFor="email">Username or Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "20px" }}
              placeholder="Enter your username or email..."
              id="email"
              className="login-input"
            />
            <label htmlFor="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ marginBottom: "10px" }}
              placeholder="Enter your password..."
              id="password"
              className="login-input"
              type="password"
            />
            <p>
              Having trouble logging in? <a href="#">Contact support.</a>
            </p>
            <p>
              Forgot your password? Click <Link to="/reset-password">here</Link>
              .
            </p>
            {error && typeof error === "string" && (
              <p style={{ color: "red" }}>Error: {error}</p>
            )}
            <button
              type="submit"
              style={{ marginTop: "20px" }}
              className="primary-btn"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
