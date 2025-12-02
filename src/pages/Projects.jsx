import { useState, useEffect } from "react";
import Filter from "../components/Filter.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import useProjects from "../hooks/useEffectProjects.js";
import "./projects.scss";

export default function Projects() {
  const { projects, loading, error } = useProjects("/data/projects.json");

  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    document.title = "Projets — Sandrine PHAM | React & Front-End";

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Découvrez les projets front-end de Sandrine PHAM : applications React, animations CSS, UX/UI et développement web moderne."
      );
    }
  }, []);

  const [filters, setFilters] = useState({
    languages: [],
    frameworks: [],
    outilsDev: [],
  });

  const filteredProjects = sortedProjects.filter((project) => {
    const matches = (key) =>
      !filters[key].length ||
      project[key]?.some((v) => filters[key].includes(v));

    return (
      matches("languages") && matches("frameworks") && matches("outilsDev")
    );
  });

  return (
    <main className="projects">
      {/* === Header de la page === */}
      <header className="projects__header header-page">
        <h1 className="page-title">Mes Projets</h1>
        <p className="page-subtitle">Une sélection de mes créations</p>
      </header>

      {/* === Section filtres === */}
      <section className="projects__filters">
        <Filter onFilterChange={setFilters} projects={projects} />
      </section>

      {/* === Liste de projets === */}
      <section className="projects__list section--row">
        {loading ? (
          <p>Chargement des projets...</p>
        ) : error ? (
          <p>Erreur : {error.message}</p>
        ) : filteredProjects.length === 0 ? (
          <p>Aucun projet ne correspond aux filtres sélectionnés.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="projects__card-container">
              <ProjectCard project={project} />
            </div>
          ))
        )}
      </section>
    </main>
  );
}
