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
  const [auth, setAuth] = useState();

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
    // user has token, verify token with backend
    let data = await request("POST", "auth", {}, user.token).catch(() => {
      // token could not be verified
      setAuth(false);
    });
    if (!data) return setAuth(false);
    if (data.success) {
      setAuth(true);
    }
  }

  return auth;
}

function App() {
  const auth = useAuthStatus();

  console.log("Authenticated:", auth === undefined ? "Loading..." : auth);

  // component did mount
  useEffect(() => {}, []);

  if (auth === undefined) return null;

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
          <Routes>
            <Route
              path="*"
              element={
                <button
                  onClick={() => {
                    window.localStorage.removeItem("user");
                    window.dispatchEvent(new Event("storage"));
                  }}
                  style={{ margin: "50px 50px" }}
                >
                  Sign Out
                </button>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
