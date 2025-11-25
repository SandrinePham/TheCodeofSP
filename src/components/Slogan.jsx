import React, { useEffect, useState } from "react";
import useEffectContent from "../hooks/useEffectContent.js";
import SloganEffect from "./SloganEffect.jsx";
import "./slogan.scss";

const Slogan = ({ theme = "accueillant", speed = 50, startDelay = 500 }) => {
  const { content, loading, error } = useEffectContent();
  const [isVisible, setIsVisible] = useState(false);

  // Apparition en douceur
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <span className="slogan__loading">Chargement…</span>;
  if (error) return <span className="slogan__error">Erreur de chargement</span>;

  const sloganText = content?.home?.slogan;
  if (!sloganText) return null;

  return (
    <div
      className={`slogan-container ${
        isVisible ? "visible" : ""
      }`}
    >
      {/* Balise SEO sémantique */}
      <div className="slogan-title" aria-label={sloganText}>
        <SloganEffect
          text={sloganText}
          theme={theme}
          speed={speed}
          startDelay={startDelay}
        />
      </div>
    </div>
  );
};

export default React.memo(Slogan);
