import "./App.css";
import Login from "./routes/login/Login";
import Reset from "./routes/login/Reset";

// React Router imports
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import request from "./utils/Request";

export function useAuthStatus() {
  const [auth, setAuth] = useState(false);

  // on mount
  useEffect(() => {
    // add listener for storage change
    window.addEventListener("storage", checkAuth);

    checkAuth();

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  async function checkAuth() {
    // check local storage
    let user = window.localStorage.getItem("user");
    if (!user || !JSON.parse(user).token) return setAuth(false);
    user = JSON.parse(user);
    // user has token
    console.log(user);
    // verify token with backend
    let data = await request("POST", "auth", {}, user.token).catch(() => {
      // token could not be verified
      setAuth(false);
    });
    if (!data) return setAuth(false);
    console.log("DATA:", data);
  }

  // check user authentication status
  // if no token, auth is false
  // if token check with backend for result

  return auth;
}

function App() {
  const auth = useAuthStatus();

  console.log(auth);

  // component did mount
  useEffect(() => {}, []);

  return (
    <Router>
      {!auth ? (
        /* Login Flow */
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<Reset />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      ) : (
        /* App Flow*/
        <>
          <button style={{ margin: "50px 50px" }}>Sign Out</button>
        </>
      )}
    </Router>
  );
}

export default App;
