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

  function checkAuth() {
    // check local storage
    const user = window.localStorage.getItem("user");
    console.log(user);
    if (!user || !user.token) return setAuth(false);
    // user has token
    // TODO check token with backend
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
        <></>
      )}
    </Router>
  );
}

export default App;
