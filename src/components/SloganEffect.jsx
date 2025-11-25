import { useEffect, useState, useRef } from "react";
import "./sloganEffect.scss";

const SloganEffect = ({ text = "", speed = 50, startDelay = 500, theme }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentChar, setCurrentChar] = useState(0);
  const timeoutRef = useRef(null);

  // Reset animation quand le thème ou le texte change
  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (theme === "accueillant") {
      setDisplayedText("");
      setCurrentChar(0);
    } else {
      // Pas d'animation → afficher tout directement
      setDisplayedText(text);
      setCurrentChar(text.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, theme]);

  // Animation typewriter pour ACCUEILLANT
  useEffect(() => {
    if (theme !== "accueillant") return;
    if (currentChar >= text.length) return;

    timeoutRef.current = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentChar]);
      setCurrentChar((prev) => prev + 1);
    }, currentChar === 0 ? startDelay : speed);

    return () => clearTimeout(timeoutRef.current);
  }, [currentChar, text, speed, startDelay, theme]);

  return (
    <div className={`sloganEffect-container ${theme}`}>
      <span className="sloganEffect-line">
        {displayedText}

        {theme === "accueillant" && (
          <span className="cursor">|</span>
        )}
      </span>
    </div>
  );
};

export default SloganEffect;
