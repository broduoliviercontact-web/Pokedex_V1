import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const navLinkClassName = ({ isActive }) =>
  isActive ? "nav-link nav-link-active" : "nav-link";

function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        Pokédex
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/pokemons" className={navLinkClassName}>
          Pokémons
        </NavLink>
        <NavLink to="/types" className={navLinkClassName}>
          Types
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
