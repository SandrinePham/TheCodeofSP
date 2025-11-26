import { useState, useEffect } from "react";
import PostItIntro from "../assets/images/postIt/PostItIntro.webp";
import PostItIntroMobile from "../assets/images/postIt/PostItIntroMobile.webp";
import "./intro.scss";
import LogoEnergique from "../assets/images/logo/LogoEnergique.svg";
import LogoAccueillant from "../assets/images/logo/LogoAccueillant.svg";
import LogoMinimalism from "../assets/images/logo/LogoMinimalismWhite.svg";
import Tooltip from "../components/Tooltip.jsx"; // <-- importer le tooltip

export default function Intro({ onSelectTheme }) {
  const [hover, setHover] = useState("");
  const [flyOut, setFlyOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [logo, setLogo] = useState(LogoEnergique);

  const [isMobile, setIsMobile] = useState(false); // ← état pour mobile
  // tooltip state
  const [tooltip, setTooltip] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000); // durée fly-in
    return () => clearTimeout(timer);
  }, []);

  const applyTheme = (theme) => {
    setFlyOut(true);
    setFadeOut(true);
    setTimeout(() => {
      sessionStorage.setItem("theme", theme);
      onSelectTheme(theme);
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applyDefaultTheme = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "energique" : "accueillant";
    applyTheme(defaultTheme);
  };

  // helper pour gérer mouse enter/leave/move
  const handleEnter = (e, hoverKey, logoImg, tipText) => {
    setHover(hoverKey);
    setLogo(logoImg);
    setTooltip(tipText || "");
    // position initiale
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  const handleMove = (e) => {
    // mise à jour de la position pour suivre légèrement la souris
    setTooltipPos({ x: e.clientX, y: e.clientY - 12 });
  };

  const handleLeave = () => {
    setHover("");
    setTooltip("");
    setLogo(LogoEnergique);
  };

  return (
    <div className={`intro-page ${flyOut ? "exiting" : ""}`} data-hover={hover}>
      <div className="intro-container">
        {showContent && (
          <div className={`intro-content ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="intro-title">Sandrine PHAM</h1>
            <p className="intro-ttitle">Développeuse Web</p>
            <p className="intro-subtitle">Bienvenue sur mon portfolio</p>
          </div>
        )}

        <img
          src={isMobile ? PostItIntroMobile : PostItIntro} // ← choix selon la taille
          className={`intro-image ${showContent ? "fly-in" : ""} ${
            flyOut ? "fly-out" : ""
          }`}
        />

        {showContent && (
          <div
            className={`intro-buttons ${fadeOut ? "fade-out" : ""}`}
            onMouseLeave={handleLeave}
          >
            <button
              onMouseEnter={(e) =>
                handleEnter(
                  e,
                  "accueillant",
                  LogoAccueillant,
                  "Découvrez mon portfolio dans une version chaleureuse et élégante, parfaite pour vous projeter sur un projet à dimension humaine : coaching, vitrine, e-commerce…"
                )
              }
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              onClick={() => applyTheme("accueillant")}
              className="btn-accueillant"
            >
              Accueillant
            </button>

            <button
              onMouseEnter={(e) =>
                handleEnter(
                  e,
                  "energique",
                  LogoEnergique,
                  "Une présentation énergique et audacieuse de mon portfolio, idéale pour vous projeter sur un projet innovant et créatif : start-up, agence, portfolio…"
                )
              }
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              onClick={() => applyTheme("energique")}
              className="btn-energique"
            >
              Énergique
            </button>

            <button
              onMouseEnter={(e) =>
                handleEnter(
                  e,
                  "minimalism",
                  LogoMinimalism,
                  "Version propre et moderne de mon portfolio, parfaite pour vos projets où l’information prime : santé, banque, institutionnel…"
                )
              }
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              onClick={() => applyTheme("minimalism")}
              className="btn-minimalism"
            >
              Minimalisme
            </button>
          </div>
        )}

        {showContent && (
          <button
            className={`intro-default ${fadeOut ? "fade-out" : ""}`}
            onClick={applyDefaultTheme}
            onMouseEnter={(e) =>
              handleEnter(
                e,
                "", // pas de hover spécifique pour ce bouton
                LogoEnergique, // ou tu peux mettre null si pas de logo
                "L'univers pré-sélectionné s'adapte automatiquement selon votre configuration : chaleureux ou énergique."
              )
            }
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            Univers pré-sélectionné
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

      {/* Tooltip via portal — ne bloque pas les clics */}
      <Tooltip visible={!!tooltip} x={tooltipPos.x} y={tooltipPos.y}>
        {tooltip}
      </Tooltip>
    </div>
  );
}
