import React, { useState, useEffect, useRef } from "react";
import FloatingSwitcherAcceuillant from "../assets/images/images/FloatingSwitcherAcceuillant.webp";
import FloatingSwitcherEnergique from "../assets/images/images/FloatingSwitcherEnergique.webp";
import FloatingSwitcherMinimalism from "../assets/images/images/FloatingSwitcherMinimalism.webp";
import "./floatingThemeSwitcher.scss";

export default function FloatingThemeSwitcher({ theme, setTheme }) {
  const switcherImage =
    {
      accueillant: FloatingSwitcherAcceuillant,
      energique: FloatingSwitcherEnergique,
      minimalism: FloatingSwitcherMinimalism,
    }[theme] || FloatingSwitcherAcceuillant;

  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const themes = ["accueillant", "energique", "minimalism"];

  /* ------------------------------
     🎈 Mouvement fluide (optimisé)
     sans re-render constant
  --------------------------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafRef.current) return; // throttle
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setOffset({ x, y });
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ------------------------------
        🔘 Choisir un thème
  --------------------------------- */
  const handleThemeChange = (t) => {
    setTheme(t);
    setOpen(false);
  };

  /* ------------------------------
        🎛️ Bouton image accessible
  --------------------------------- */
  return (
    <div
      className={`floating-switcher ${open ? "open" : ""}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <button
        className="floating-switcher__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Ouvrir le sélecteur de thème"
      >
        <img
          src={switcherImage}
          alt={`Switch du thème ${theme}`}
          aria-hidden="true"
        />
      </button>

      <div
        className="floating-switcher__options"
        role="menu"
        aria-label="Choisir un thème"
      >
        {themes.map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? "active" : ""}`}
            onClick={() => handleThemeChange(t)}
            role="menuitemradio"
            aria-checked={theme === t}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
