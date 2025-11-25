import React from "react";
import "./highlightCard.scss";

const HighlightCard = ({ number, title, description, ariaLabel }) => {
  return (
    <article 
      className="highlight-card" 
      role="region" 
      aria-labelledby={`highlight-${title}`}
    >
      <div 
        className="highlight-card__number" 
        aria-label={ariaLabel || undefined}
      >
        {number}
      </div>

      <div className="highlight-card__text">
        <h3 id={`highlight-${title}`}>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default HighlightCard;
