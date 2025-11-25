import { useEffect, useState } from "react";

const useEffectContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchContent = async () => {
      try {
        const response = await fetch("/data/content.json");
        if (!response.ok) throw new Error("Erreur lors du chargement du contenu");

        const data = await response.json();
        if (!isCancelled) {
          setContent(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { content, loading, error };
};

export default useEffectContent;
