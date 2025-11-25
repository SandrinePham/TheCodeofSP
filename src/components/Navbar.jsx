import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/about", label: "À propos" },
    { to: "/projects", label: "Projets" },
    { to: "/skills", label: "Compétences" },
    { to: "/experience", label: "Expériences" },
  ];

  return (
    <nav className={`navbar ${isMenuOpen ? "nav--open" : ""}`}>
      {/* Overlay */}
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      {/* Bouton Burger / X */}
      <button
        className={`burger-btn ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <FaBars className="icon-burger" />
        <FaTimes className="icon-close" />
      </button>

      {/* Liste de navigation */}
      <ul className="nav_list">
        {navLinks.map((link) => (
          <li className="nav_item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav_link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
