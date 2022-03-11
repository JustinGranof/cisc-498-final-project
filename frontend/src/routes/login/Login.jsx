import React from "react";

// CSS imports
import "./login.css";

// Image imports
import Logo from "../../img/queens_logo.png";

export default function Login(props) {
  return (
    <React.Fragment>
      <div className="login-container">
        <div className="login-header-container">
          <img height={80} src={Logo} alt="" />
          <h2>Queen's Rapid Response Tool</h2>
        </div>
        <div className="login-body-container">
          <form className="login-form">
            <label htmlFor="email">Username or Email</label>
            <input
              style={{ marginBottom: "20px" }}
              placeholder="Enter your username or email..."
              id="email"
              className="login-input"
            />
            <label htmlFor="password">Password</label>
            <input
              style={{ marginBottom: "10px" }}
              placeholder="Enter your password..."
              id="password"
              className="login-input"
              type="password"
            />
          </form>
          <p>
            Having trouble logging in? <a>Contact support.</a>
          </p>
          <p>
            Forgot your password? Click <a>here</a>.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
