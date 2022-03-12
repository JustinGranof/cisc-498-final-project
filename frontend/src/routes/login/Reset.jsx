import React from "react";

import Logo from "../../img/queens_logo.png";

export default function Reset(props) {
  return (
    <React.Fragment>
      <div className="login-container">
        <div className="login-header-container">
          <img height={80} src={Logo} alt="" />
          <h2>Queen's Rapid Response Tool</h2>
        </div>
        <div className="login-body-container">
          <h3 style={{ fontWeight: "normal" }}>Reset your password</h3>
          <label htmlFor="reset">
            Please enter the email associated with your account
          </label>
          <form onSubmit={(e) => e.preventDefault()} className="login-form">
            <input
              type="email"
              placeholder="Enter your email..."
              id="reset"
              className="login-input"
              style={{ marginBottom: "30px" }}
            />
            <p>
              <a href="#">Return to login</a>
            </p>
            <button style={{ marginTop: "20px" }} className="primary-btn">
              Send reset email
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
