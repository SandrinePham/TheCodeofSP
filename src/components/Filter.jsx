import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./filter.scss";

const Tag = React.memo(({ value, active, onClick }) => (
  <button
    type="button"
    className={`tag ${active ? "tag--active" : ""}`}
    onClick={() => onClick(value)}
    aria-pressed={active}
    aria-label={`Filtrer par ${value}`}
  >
    {value}
  </button>
));

const Filter = ({ onFilterChange, projects }) => {
  const categories = ["languages", "frameworks", "outilsDev"];

  const [filtersData, setFiltersData] = useState({
    languages: [],
    frameworks: [],
    outilsDev: [],
  });

  const [activeFilters, setActiveFilters] = useState({
    languages: [],
    frameworks: [],
    outilsDev: [],
  });

  const [openCategories, setOpenCategories] = useState({
    languages: false,
    frameworks: false,
    outilsDev: false,
  });

  /* -----------------------------------
      🧠 Génération dynamique des tags
  ------------------------------------ */
  useEffect(() => {
    if (!projects?.length) return;

    const newFilters = {};
    categories.forEach((cat) => {
      newFilters[cat] = [
        ...new Set(projects.flatMap((p) => p[cat] || [])),
      ].sort((a, b) => a.localeCompare(b));
    });

    setFiltersData(newFilters);
  }, [projects]);

  /* -----------------------------------
      🎛️ Gestion Toggle Tag
  ------------------------------------ */
  const toggleFilter = useCallback(
    (category, value) => {
      setActiveFilters((prev) => {
        const updatedCategory = prev[category].includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value];

        const updatedFilters = { ...prev, [category]: updatedCategory };
        onFilterChange(updatedFilters);
        return updatedFilters;
      });
    },
    [onFilterChange]
  );

  /* -----------------------------------
      📂 Ouvrir / fermer une catégorie
  ------------------------------------ */
  const toggleCategory = useCallback((category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  /* -----------------------------------
      🔄 Réinitialisation
  ------------------------------------ */
  const resetFilters = useCallback(() => {
    const empty = categories.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {});
    setActiveFilters(empty);
    onFilterChange(empty);
  }, [onFilterChange]);

  /* -----------------------------------
      📊 Comptage dynamique
  ------------------------------------ */
  const filteredCount = useMemo(() => {
    if (!projects) return 0;
    return projects.filter((p) =>
      categories.every((key) =>
        activeFilters[key].length === 0
          ? true
          : p[key]?.some((v) => activeFilters[key].includes(v))
      )
    ).length;
  }, [projects, activeFilters]);

  return (
    <div
      className="filter-container"
      role="region"
      aria-label="Filtres de projets"
    >
      <div className="filter-categories">
        {categories.map((cat) => (
          <div className="filter-category" key={cat}>
            <button
              type="button"
              onClick={() => toggleCategory(cat)}
              className="category-title"
              aria-expanded={openCategories[cat]}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              <span className={`arrow ${openCategories[cat] ? "open" : ""}`}>
                ▼
              </span>
            </button>

            <div
              className={`checkbox-group ${openCategories[cat] ? "open" : ""}`}
              role="group"
              aria-label={`Filtres ${cat}`}
            >
              {filtersData[cat]?.map((opt) => (
                <Tag
                  key={opt}
                  value={opt}
                  active={activeFilters[cat]?.includes(opt)}
                  onClick={(v) => toggleFilter(cat, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="filter-actions">
        <button className="reset-filters" onClick={resetFilters}>
          Réinitialiser
        </button>

        <span className="projects-count">
          {filteredCount}{" "}
          {filteredCount > 1 ? "projets trouvés" : "projet trouvé"}
          {projects?.length ? ` sur ${projects.length}` : ""}
        </span>
      </div>
    </div>
  );
};

export default Filter;
