import { useState, useEffect } from "react";
import "./intro.scss";
import { FaSearch } from "react-icons/fa";

import LogoEnergique from "../assets/images/logo/SPEnergique.svg";
import LogoAccueillant from "../assets/images/logo/SPAcceuillant.svg";
import LogoMinimalism from "../assets/images/logo/SPMinimalism.svg";

export default function Intro({ onSelectTheme, animating }) {
  const [typingText, setTypingText] = useState("");
  const fullText = "Sandrine Pham, Développeuse Web";
  const [showResults, setShowResults] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const applyTheme = (theme) => {
    setSelectedTheme(theme);
    setIsTransitioning(true);

    // attend la fin de l'animation (ex: 500ms)
    setTimeout(() => {
      sessionStorage.setItem("theme", theme);
      onSelectTheme(theme);
    }, 500);
  };

  return (
    <div className="intro-search-page">
      <div className={`intro-content ${isTransitioning ? "fade-out" : ""}`}>
      <div className="search-box">
        <div className="fake-google-bar">
          <FaSearch className="search-loupe" />
          <span className="typing-text">{typingText}</span>
          <span className="cursor">|</span>
        </div>
        <div
          className={` ${showResults ? "visible" : ""} ${
            animating ? "fade-out-results" : ""
          }`}
        >
          {/* résultats */}
        </div>
      </div>
      <div
        className={`search-results ${showResults ? "visible" : ""} 
        }`}
      >
        {" "}
        <div className="result-accueillant">
          <button onClick={() => applyTheme("accueillant")} className="lien">
            <div className="search-item">
              <img
                src={LogoAccueillant}
                alt="logo"
                className="search-favicon"
              />
              <div className="result-header">
                <span className="lien-title">Sandrine Pham</span>
                <span className="lien">http://www.thecodeofsp.fr</span>
              </div>
            </div>
            <p className="result-url">Portfolio version Accueillante</p>
          </button>
          <p className="result-description">
            Découvrez mon portfolio dans une version chaleureuse et élégante,
            parfaite pour vous projeter sur un projet à dimension humaine :
            coaching, vitrine, e-commerce…{" "}
          </p>
        </div>
        <div className="result-energique">
          <button onClick={() => applyTheme("energique")} className="lien">
            <div className="search-item">
              <img src={LogoEnergique} alt="logo" className="search-favicon" />
              <div className="result-header">
                <span className="lien-title">Sandrine Pham</span>
                <span className="lien">http://www.thecodeofsp.fr</span>
              </div>
            </div>
            <p className="result-url">Portfolio version Énergique</p>
          </button>
          <p className="result-description">
            Une présentation énergique et audacieuse de mon portfolio, idéale
            pour vous projeter sur un projet innovant et créatif : start-up,
            agence, portfolio…{" "}
          </p>
        </div>
        <div className="result-minimalism">
          <button onClick={() => applyTheme("minimalism")} className="lien">
            <div className="search-item">
              <img src={LogoMinimalism} alt="logo" className="search-favicon" />
              <div className="result-header">
                <span className="lien-title">Sandrine Pham</span>
                <span className="lien">http://www.thecodeofsp.fr</span>
              </div>
            </div>
            <p className="result-url">Portfolio version Minimaliste</p>
          </button>
          <p className="result-description">
            Version propre et moderne de mon portfolio, parfaite pour vos
            projets où l’information prime : santé, banque, institutionnel…{" "}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
