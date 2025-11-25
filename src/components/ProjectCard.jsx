import React, { useState, useMemo } from "react";
import "./projectCard.scss";

export default function ProjectCard({ project }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!project) return null;

  const toggleDesc = () => setShowFullDesc((prev) => !prev);

  const imageSrc = project?.image
    ? `${import.meta.env.BASE_URL}${project.image.slice(1)}`
    : "";

  const sortedTechnologies = useMemo(() => {
    const sortAlpha = (arr) => [...arr].sort((a, b) => a.localeCompare(b));

    const languages = sortAlpha(project?.languages ?? []);
    const frameworks = sortAlpha(project?.frameworks ?? []);
    const outilsDev = sortAlpha(project?.outilsDev ?? []);

    // Fusion dans l’ordre voulu, mais classés par catégorie
    return [...languages, ...frameworks, ...outilsDev];
  }, [project]);

  return (
    <article
      className="project-card"
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* IMAGE */}
      {imageSrc && (
        <figure className="project-card__image">
          <img
            src={imageSrc}
            alt={project.alt || `Screenshot du projet ${project.title}`}
            loading="lazy"
            width="600"
            height="300"
            decoding="async"
            itemProp="image"
          />
          {project.status && (
            <figcaption className="project-card__status">
              {project.status}
            </figcaption>
          )}
        </figure>
      )}

      {/* CONTENU */}
      <div className="project-card__content">
        <h3
          id={`project-title-${project.id}`}
          className="project-card__title"
          itemProp="name"
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        {project.description && (
          <>
            <p
              className={`project-card__description ${
                showFullDesc ? "full" : ""
              }`}
              itemProp="description"
              id={`desc-${project.id}`}
            >
              {project.description}
            </p>

            {project.description.length > 80 && (
              <button
                className="show-more"
                onClick={toggleDesc}
                aria-expanded={showFullDesc}
                aria-controls={`desc-${project.id}`}
                role="button"
              >
                {showFullDesc ? "Afficher moins ▴" : "Afficher plus ▾"}
              </button>
            )}
          </>
        )}

        {/* TECHNOLOGIES */}
        {sortedTechnologies.length > 0 && (
          <div className="project-card__technologies">
            {sortedTechnologies.map((tech) => (
              <span key={tech} className="tech-tag" itemProp="keywords">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="project-card__actions">
          {project.projet && (
            <a
              href={project.projet}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn--secondary"
              aria-label={`Voir le projet ${project.title}`}
              itemProp="url"
            >
              Voir le projet
            </a>
          )}

          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn--outline"
              aria-label={`Voir le code source du projet ${project.title}`}
              itemProp="codeRepository"
            >
              Code source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
