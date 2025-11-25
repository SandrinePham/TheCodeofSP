import { useEffect, useRef, useState } from "react";
import useEffectContent from "../hooks/useEffectContent.js";
import "./about.scss";

const About = () => {
  const { content, loading, error } = useEffectContent();
  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  // SEO — toujours avant les retours conditionnels
  useEffect(() => {
    document.title = "À propos — Sandrine PHAM | Développeuse Front-End";

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "En savoir plus sur Sandrine PHAM, développeuse front-end passionnée par React, UI moderne et création d'expériences web accessibles."
      );
    }
  }, []);

  // IntersectionObserver pour fade-in des sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((ref) => ref && observer.observe(ref));
    return () =>
      sectionsRef.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  if (loading)
    return (
      <main className="about">
        <p>Chargement du contenu...</p>
      </main>
    );
  if (error)
    return (
      <main className="about">
        <p>Erreur : {error.message}</p>
      </main>
    );

  const aboutData = content?.about;
  if (!aboutData) return null;

  return (
    <main className="about">
      {/* === Header de la page === */}
      <header className="about__header header-page">
        <h1 className="page-title">{aboutData.title}</h1>
        <p className="page-subtitle">{aboutData.subtitle}</p>
      </header>

      {/* === Sections principales === */}
      <section className="about__sections">
        {aboutData.sections.map((section, idx) => (
          <article
            key={idx}
            className={`about__story story-section ${
              visibleSections.includes(String(idx)) ? "visible" : ""
            }`}
            ref={(el) => (sectionsRef.current[idx] = el)}
            data-index={idx}
          >
            <h2 className="section-title">{section.subtitle}</h2>

            {section.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            {section.philosophyPoints && (
              <div className="about__points philosophy-points">
                {section.philosophyPoints.map((point, j) => (
                  <div key={j} className="about__point point">
                    <strong>{point.label}</strong> – {point.description}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default About;
