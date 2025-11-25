import { useRef, useState, useEffect } from "react";
import useEffectContent from "../hooks/useEffectContent.js";
import "./experiences.scss";

const Experience = () => {
  const { content, loading, error } = useEffectContent();
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  // SEO — avant les returns
  useEffect(() => {
    document.title = "Expériences — Sandrine PHAM | Développeuse Web";

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Expériences professionnelles de Sandrine PHAM : développement front-end, projets React, missions web et réalisations."
      );
    }
  }, []);

  // Intersection Observer pour animation fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting && !visibleCards.includes(Number(index))) {
            setVisibleCards((prev) => [...prev, Number(index)]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      cardRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [visibleCards]);

  if (loading)
    return (
      <main className="experience">
        <p>Chargement...</p>
      </main>
    );

  if (error)
    return (
      <main className="experience">
        <p>Erreur lors du chargement du contenu</p>
      </main>
    );

  const jobs = content?.experience?.content || [];

  return (
    <main className="experience">
      {/* HEADER */}
      <header className="experience__header header-page">
        <h1 className="page-title">{content?.experience?.title}</h1>
        <p className="page-subtitle">{content?.experience?.subtitle}</p>
      </header>

      {/* CONTENT */}
      <section className="experience__content section--row">
        {jobs.map((job, index) => (
          <article
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            className={`experience__card ${
              visibleCards.includes(index) ? "visible" : ""
            }`}
          >
            <h2 className="experience__card-title">{job.title}</h2>
            <div className="experience__card-company-container">
              <h3 className="experience__card-company">
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="experience__card-company-link"
                >
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="experience__card-logo"
                  />
                </a>
              </h3>
              <p className="experience__card-lieu">à {job.lieu}</p>
            </div>
            <time className="experience__card-period">{job.period}</time>
            <ul className="experience__card-tasks">
              {job.tasks?.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Experience;
