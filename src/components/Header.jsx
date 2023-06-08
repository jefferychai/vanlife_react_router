import React from "react";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import loginIcon from "../images/login-icon.png";

export default function Header() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("loggedIn");
    return navigate("/vanlife_react_router/login");
  }

  return (
    <header>
      <Link className="site-logo" to="/vanlife_react_router">
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
        {isLoggedIn ? (
          <Form method="post">
            <button type="submit" onClick={logout} className="logout-btn">
              Logout
            </button>
          </Form>
        ) : (
          <NavLink to="login">
            <img src={loginIcon} alt="login_icon_img" />
          </NavLink>
        )}
      </nav>
    </header>
  );
}
