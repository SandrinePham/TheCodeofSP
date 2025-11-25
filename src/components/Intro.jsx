import { useState, useEffect } from "react";
import PostItIntro from "../assets/images/postIt/PostItIntro.webp";
import "./intro.scss";
import LogoEnergique from "../../src/assets/images/logo/LogoEnergique.svg";
import LogoAcceuillant from "../../src/assets/images/logo/LogoAccueillant.svg";
import LogoMinimalism from "../../src/assets/images/logo/LogoMinimalismWhite.svg";

export default function Intro({ onSelectTheme }) {
  const [hover, setHover] = useState("");
  const [flyOut, setFlyOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [logo, setLogo] = useState(LogoEnergique);

  // Montre le contenu après l'animation fly-in
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000); // durée fly-in
    return () => clearTimeout(timer);
  }, []);

  const applyTheme = (theme) => {
    setFlyOut(true); // déclenche fly-out Post-it
    setFadeOut(true); // déclenche fade-out du reste

    setTimeout(() => {
      sessionStorage.setItem("theme", theme);
      onSelectTheme(theme); // passe à AppRouter après animation
    }, 1000); // durée totale animation
  };

  const applyDefaultTheme = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "energique" : "accueillant";
    applyTheme(defaultTheme);
  };

  return (
    <div className={`intro-page ${flyOut ? "exiting" : ""}`} data-hover={hover}>
      <div className="intro-container">
        {/* Contenu texte */}
        {showContent && (
          <div className={`intro-content ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="intro-title">Sandrine PHAM</h1>
            <p className="intro-ttitle">Développeuse Web</p>
            <p className="intro-subtitle">Bienvenue sur mon portfolio</p>
          </div>
        )}

        {/* Post-it */}
        <img
          src={PostItIntro}
          alt="Post-it introduction"
          className={`intro-image ${showContent ? "fly-in" : ""} ${
            flyOut ? "fly-out" : ""
          }`}
        />

        {/* Boutons */}
        {showContent && (
          <div
            className={`intro-buttons ${fadeOut ? "fade-out" : ""}`}
            onMouseLeave={() => {
              setHover("");
              setLogo(LogoEnergique); // retourne au logo par défaut
            }}
          >
            <button
              onMouseEnter={() => {
                setHover("accueillant");
                setLogo(LogoAcceuillant);
              }}
              onClick={() => applyTheme("accueillant")}
              className="btn-accueillant"
            >
              Accueillant
            </button>

            <button
              onMouseEnter={() => {
                setHover("energique");
                setLogo(LogoEnergique);
              }}
              onClick={() => applyTheme("energique")}
              className="btn-energique"
            >
              Énergique
            </button>

            <button
              onMouseEnter={() => {
                setHover("minimalism");
                setLogo(LogoMinimalism);
              }}
              onClick={() => applyTheme("minimalism")}
              className="btn-minimalism"
            >
              Minimaliste
            </button>
          </div>
        )}

        {/* Bouton thème par défaut */}
        {showContent && (
          <button
            className={`intro-default ${fadeOut ? "fade-out" : ""}`}
            onClick={applyDefaultTheme}
          >
            Thème pré-sélectionné
          </button>
        )}
        {showContent && (
        <img
          src={logo}
          alt="Logo intro"
          className={`intro-logo ${fadeOut ? "fade-out" : ""}`}
        />
        )}
      </div>
    </div>
  );
}
