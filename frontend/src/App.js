import "./App.css";
import Login from "./routes/login/Login";
import Reset from "./routes/login/Reset";
import ClassList from "./routes/classes/classesList";
import Class from "./routes/classes/class";

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
    let data = await request("POST", "auth", {}, true).catch((e) => {
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
            <Route path="/classes" element={<ClassList />} />
            <Route path="/class" element={<Class />} />
            <Route
              path="*"
              element={
                <>
                  <button
                    onClick={() => {
                      window.localStorage.removeItem("user");
                      window.dispatchEvent(new Event("storage"));
                    }}
                    style={{ margin: "50px 50px" }}
                  >
                    Sign Out
                  </button>
                  <button
                    onClick={() => {
                      request(
                        "POST",
                        "account/create",
                        { email: "test@gmail.com", password: "1234" },
                        true
                      ).then((data) => {
                        console.log(data);
                      });
                    }}
                  >
                    Create User
                  </button>
                </>
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
