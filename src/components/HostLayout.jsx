import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <div>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          className={({ isActive }) => (isActive ? "selected" : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          className={({ isActive }) => (isActive ? "selected" : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => (isActive ? "selected" : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? "selected" : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
