import { useEffect, useState, useRef } from "react";
import "./sloganEffect.scss";

const SloganEffect = ({
  text = "",
  speed = 50,
  startDelay = 500,
  theme,
  showCursor = true,
  keepCursorAtEnd = false,
  onComplete, // 🔹 nouveau
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setDisplayedText("");
    setCurrentChar(0);
    setIsTyping(false);
    return () => clearTimeout(timeoutRef.current);
  }, [text]);

  useEffect(() => {
    if (currentChar === 0) setIsTyping(true);

    if (currentChar >= text.length) {
      setIsTyping(false);
      if (onComplete) onComplete(); // 🔹 callback terminé
      return;
    }

    timeoutRef.current = setTimeout(
      () => {
        setDisplayedText(text.slice(0, currentChar + 1));
        setCurrentChar((prev) => prev + 1);
      },
      currentChar === 0 ? startDelay : speed
    );

    return () => clearTimeout(timeoutRef.current);
  }, [currentChar, text, speed, startDelay, onComplete]);

  return (
    <div className={`sloganEffect-container ${theme}`}>
      <span className="sloganEffect-line">
        {displayedText}
        {showCursor && (isTyping || keepCursorAtEnd) && (
          <span className="cursor">|</span>
        )}
      </span>
    </div>
  );
};

export default SloganEffect;
