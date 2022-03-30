// nav bar
import "./NavBar.css";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isSuperAdmin = true; // if user is a superadmin it will render a diff nav bar

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav>
      {isSuperAdmin == true && (
        <ul className="list">
          <li className="items">Admins</li>
          <li className="items">
            <a href="/classes">Classes</a>
          </li>
          <li className="items">Logout</li>
        </ul>
      )}

      {isSuperAdmin == false && (
        <ul className="list">
          <li className="items">
            <a href="/classes">Classes</a>
          </li>
          <li className="items">Logout</li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
