import { useEffect, useRef, useState } from "react";
import { FaCode, FaWarehouse } from "react-icons/fa";
import useEffectContent from "../hooks/useEffectContent.js";
import "./skills.scss";

const Skills = () => {
  const { content, loading, error } = useEffectContent();
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    document.title = "Compétences — Sandrine PHAM | Développement Front-End";

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Parcours et compétences front-end de Sandrine PHAM : React, JavaScript, CSS, responsive design, accessibilité, performance, UI moderne."
      );
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => refs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  if (loading)
    return (
      <main className="skills">
        <p>Chargement du contenu...</p>
      </main>
    );
  if (error)
    return (
      <main className="skills">
        <p>Erreur : {error.message}</p>
      </main>
    );

  const skillsData = content?.skills?.content || {};
  const languagesFrameworks = skillsData?.languagesFrameworks || [];
  const tools = skillsData?.toolsEnvironment || [];
  const methodologies = skillsData?.methodologies || [];
  const diplomas = skillsData?.diplomas || [];

  return (
    <main className="skills">
      <div className="container">
        <header className="skills__header header-page">
          <h1 className="page-title">
            {content?.skills?.title || "Mes Compétences"}
          </h1>
          <p className="page-subtitle">{content?.skills?.subtitle}</p>
        </header>

        <div className="skills__content">
          {/* Langages & Frameworks */}
          <section className="skills__section">
            <h2 className="section-title">{content?.skills?.subtitle1}</h2>
            <div className="skills__list">
              {languagesFrameworks.map((skill, i) => (
                <div
                  key={skill.name}
                  ref={(el) => (refs.current[i] = el)}
                  data-index={`skill-${i}`}
                  className={`skills__lf ${
                    visible.includes(`skill-${i}`) ? "visible" : ""
                  }`}
                >
                  <div className="skills__item-header">
                    <span className="skills__item-name">{skill.name}</span>
                    <span className="skills__item-level">{skill.level}%</span>
                  </div>
                  <div className="skills__item-bar">
                    <div
                      className="skills__item-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outils & Environnement */}
          <section className="skills__section">
            <h2 className="section-title">{content?.skills?.subtitle2}</h2>
            <div className="skills__tools skills__row">
              {tools.map((tool, i) => (
                <div
                  key={tool}
                  ref={(el) => (refs.current[languagesFrameworks.length + i] = el)}
                  data-index={`tool-${i}`}
                  className={`skills__tool ${
                    visible.includes(`tool-${i}`) ? "visible" : ""
                  }`}
                >
                  {tool}
                </div>
              ))}
            </div>
          </section>

          {/* Méthodologies */}
          <section className="skills__section">
            <h2 className="section-title">{content?.skills?.subtitle3}</h2>
            <div className="skills__methodologies skills__row">
              {methodologies.map((m, i) => (
                <div
                  key={i}
                  ref={(el) => (refs.current[languagesFrameworks.length + tools.length + i] = el)}
                  data-index={`method-${i}`}
                  className={`skills__methodology ${
                    visible.includes(`method-${i}`) ? "visible" : ""
                  }`}
                >
                  <h3>{m.name}</h3>
                  <p>{m.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Diplômes */}
          <section className="skills__section">
            <h2 className="section-title">{content?.skills?.subtitle4}</h2>
            <div className="skills__diplomas skills__row">
              {diplomas.map((diploma, i) => {
                const Icon = diploma.icon === "FaCode" ? FaCode : FaWarehouse;
                return (
                  <div
                    key={i}
                    ref={(el) => (refs.current[languagesFrameworks.length + tools.length + methodologies.length + i] = el)}
                    data-index={`diploma-${i}`}
                    className={`skills__diploma ${
                      visible.includes(`diploma-${i}`) ? "visible" : ""
                    }`}
                  >
                    <div className="skills__diploma-header">
                      <Icon className="skills__diploma-icon" />
                      <div>
                        <h3 className="skills__diploma-title">
                          {diploma.title}
                        </h3>

                        <span className="skills__diploma-year">
                          {diploma.year}
                        </span>
                        <span className="skills__diploma-badge">
                          {diploma.niveau}
                        </span>
                      </div>
                    </div>
                    <a
                      href={diploma.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skills__diploma-institution"
                    >
                      <img
                        src={diploma.logo}
                        alt={`${diploma.institution} logo`}
                        className="skills__diploma-logo"
                      />
                    </a>

                    <p className="skills__diploma-location">{diploma.lieux}</p>
                    {diploma.qualification && (
                      <p className="skills__diploma-qualification">
                        {diploma.qualification}
                      </p>
                    )}
                    {diploma.skills && (
                      <ul className="skills__diploma-skills">
                        {diploma.skills.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Skills;
