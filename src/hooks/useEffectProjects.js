import { useEffect, useState } from "react";

const useProjects = (jsonPath = "/projects.json") => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Erreur de chargement des projets");

        const data = await response.json();

        if (!isCancelled) {
          setProjects(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true; // évite setState après unmount
    };
  }, [jsonPath]);

  return { projects, loading, error };
};

export default useProjects;
