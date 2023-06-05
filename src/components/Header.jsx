import React from "react";
import { Link, NavLink } from "react-router-dom";
import loginIcon from "../images/login-icon.png";

export default function Header() {
  function fakeLogout() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav>
        <NavLink
          to="host"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          Vans
        </NavLink>
        <NavLink to="login">
          <img src={loginIcon} alt="login_icon_img" />
        </NavLink>

        <button onClick={fakeLogout}>X</button>
      </nav>
    </header>
  );
}
