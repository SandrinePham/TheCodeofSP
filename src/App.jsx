import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter.jsx";
import Intro from "./components/Intro.jsx";
import "./app.scss";

function App() {
  const [theme, setTheme] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setShowIntro(false); // passe direct si déjà choisi
    }
  }, []);

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setAnimating(true);
    setTimeout(() => {
      setShowIntro(false);
      setAnimating(false);
    }, 1000);
  };

  // Nouvelle fonction pour revenir à Intro
  const resetIntro = () => {
    setShowIntro(true);
    setAnimating(true);
    setTheme(null); // reset thème si besoin
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };

  if (showIntro) {
    return <Intro onSelectTheme={handleThemeSelect} animating={animating} />;
  }

  // Passer resetIntro au Header via AppRouter ou directement
  return (
    <AppRouter theme={theme} setTheme={setTheme} resetIntro={resetIntro} />
  );
}

export default App;
