import React, { useEffect, useState } from "react";
import useEffectContent from "../hooks/useEffectContent.js";
import SloganEffect from "./SloganEffect.jsx";
import "./slogan.scss";

const Slogan = ({ theme = "accueillant", speed = 50, startDelay = 500 }) => {
  const { content, loading, error } = useEffectContent();
  const [isVisible, setIsVisible] = useState(false);
  const [showSlogan2, setShowSlogan2] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <span className="slogan__loading">Chargement…</span>;
  if (error) return <span className="slogan__error">Erreur de chargement</span>;

  const sloganText = content?.home?.slogan;
  const slogan2Text = content?.home?.slogan2;

  if (!sloganText && !slogan2Text) return null;

  return (
    <div className={`slogan-container ${isVisible ? "visible" : ""}`}>
      <div className="slogan-title">
        {/* Slogan 1 */}
        {sloganText && (
          <SloganEffect
            text={sloganText}
            theme={theme}
            speed={speed}
            startDelay={startDelay}
            showCursor={true}
            keepCursorAtEnd={false} // curseur disparaît
            onComplete={() => setShowSlogan2(true)} // 🔹 déclenche Slogan2
          />
        )}

        {/* Slogan 2 inline */}
        {showSlogan2 && slogan2Text && (
          <span className="slogan2">
            <SloganEffect
              text={slogan2Text}
              theme={theme}
              speed={speed}
              startDelay={0} // démarre immédiatement après Slogan1
              showCursor={true}
              keepCursorAtEnd={true} // curseur reste à la fin
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(Slogan);
