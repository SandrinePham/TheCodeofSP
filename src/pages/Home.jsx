import React, { useEffect, useState } from "react";
import Slogan from "../components/Slogan.jsx";
import HighLightCard from "../components/HighlightCard.jsx";
import useEffectContent from "../hooks/useEffectContent.js";
import HomeAccueillant from "../assets/images/images/HomeAccueillant.webp";
import HomeEnergique from "../assets/images/images/HomeEnergique.webp";
import HomeMinimalism from "../assets/images/images/HomeMinimalism.webp";
import Scotch from "../assets/images/images/Scotch.webp"; // une seule image pour tous les thèmes

import "./home.scss";

const Home = ({ theme }) => {
  const homeImage =
    {
      accueillant: HomeAccueillant,
      energique: HomeEnergique,
      minimalism: HomeMinimalism,
    }[theme] || HomeAccueillant;

  const { content, loading, error } = useEffectContent();
  const [showContent, setShowContent] = useState(false);
  const [showPostIt, setShowPostIt] = useState(false);

  // SEO
  useEffect(() => {
    document.title = "Sandrine PHAM — Développeuse Web Front-End | Portfolio";
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Découvrez le portfolio de Sandrine PHAM, développeuse web front-end spécialisée en React, JavaScript, CSS et conception d'interfaces modernes."
      );
    }
  }, []);

  // Animation séquentielle : fade-in contenu puis fly-in Post-it
  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 200);
    const postItTimer = setTimeout(() => setShowPostIt(true), 1200);
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(postItTimer);
    };
  }, []);

  if (loading)
    return (
      <main className="home">
        <p>Chargement du contenu...</p>
      </main>
    );

  if (error)
    return (
      <main className="home">
        <p>Erreur : {error.message}</p>
      </main>
    );

  const homeContent = content?.home;
  const highlights = content?.highlights?.cards || [];

  return (
    <main className="home">
      {/* Présentation */}
      <section className="home__presentation">
        <div className="home__presentation-container">
          <div className="home__postit">
            <img
              src={homeImage}
              alt={`Illustration du thème ${theme}`}
              className={`home__postit-image ${
                showPostIt ? "fly-in" : "pre-fly"
              }`}
              fetchPriority="high"
            />
            {/* Bande de scotch en image */}
            <img
              src={Scotch}
              alt=""
              className={`tape ${showPostIt ? "tape-in" : "tape-pre"}`}
              aria-hidden="true"
            />
          </div>
          <div className="home__content" data-show={showContent}>
            <div className="slogan-wrapper">
              <Slogan theme={theme} />
            </div>
            <div className="home__content-fixed">
              <p className="home__intro">{homeContent?.content}</p>
              <p className="home__accroche">{homeContent?.accroche}</p>
              <div className="home__titles">
                <h1 className="home__title">{homeContent?.title}</h1>
                <p className="home__subtitle">{homeContent?.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights dynamiques */}
      <section className="home__highlights" data-show={showContent}>
        <h2 className="page-title">{content?.highlights?.title}</h2>
        <div className="home__highlights-container">
          {highlights.map((card, index) => (
            <HighLightCard
              key={index}
              number={card.number}
              title={card.title}
              description={card.description}
              ariaLabel={card.ariaLabel}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
