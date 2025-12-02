import Navbar from "./Navbar.jsx";
import "./header.scss";

import logoAccueillant from "/images/logo/LogoAccueillant.svg";
import logoMinimalism from "/images/logo/LogoMinimalism.svg";
import logoEnergique from "/images/logo/LogoEnergique.svg";

const logos = {
  energique: logoEnergique,
  minimalism: logoMinimalism,
  accueillant: logoAccueillant,
};

const Header = ({ theme, resetIntro = { resetIntro } }) => {
  const logoSrc = logos[theme] || logos.accueillant;

  return (
    <header className="header" role="banner">
      <section className="header_container">
        <button
          onClick={resetIntro} // <-- ici on appelle resetIntro
          className="header_logo-link"
          aria-label="Retour à l’accueil"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={logoSrc}
            alt={`Logo du thème ${theme}`}
            className="header_logo"
          />
        </button>

        <Navbar />
      </section>
    </header>
  );
};
export default Header;
