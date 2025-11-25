import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Experience from "../pages/Experiences";
import ThemeSwitcher from "../components/FloatingThemeSwitcher";

const updateFavicon = (theme) => {
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  switch (theme) {
    case "accueillant":
      favicon.href = "/images/logo/SPDark.svg";
      break;
    case "energique":
      favicon.href = "/images/logo/SPEnergique.svg";
      break;
    case "minimalism":
      favicon.href = "/images/logo/SPDark.svg";
      break;
    default:
      favicon.href = "/images/logo/SPDark.svg";
  }
};

const AppRouter = ({ theme, setTheme, resetIntro }) => {
  // 💡 Applique la classe du thème au body pour les styles SCSS globaux
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(
      "theme-accueillant",
      "theme-energique",
      "theme-minimalism"
    );

    root.classList.add(`theme-${theme}`);

    sessionStorage.setItem("theme", theme); // ← sauvegarde auto
    // 🔥 Met à jour le favicon
    updateFavicon(theme);
  }, [theme]);

  return (
    <Router>
      <div className={`app theme-${theme}`}>
        <Header theme={theme} resetIntro={resetIntro} />

        <main>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} />
            <Route path="/projects" element={<Projects theme={theme} />} />
            <Route path="/skills" element={<Skills theme={theme} />} />
            <Route path="/experience" element={<Experience theme={theme} />} />
          </Routes>
        </main>

        {/* Ce composant change le thème */}
        <ThemeSwitcher theme={theme} setTheme={setTheme} />

        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
