import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

import "./footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">

        {/* Introduction */}
        <section className="footer__intro" aria-labelledby="footer-title">
          <h2 id="footer-title" className="footer__title">
            Sandrine Pham
          </h2>
          <p className="footer__description">
            Développeuse Front-end passionnée, je transforme vos idées en
            expériences digitales élégantes et fonctionnelles.
          </p>
        </section>

        {/* Contenu principal */}
        <section className="footer__content">

          {/* Contact */}
          <div className="footer__section footer__contact" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title" className="footer__subtitle">
              Contact
            </h3>
            <ul>
              <li>
                <FaEnvelope aria-hidden="true" />
                <a href="mailto:thecodeofsp@gmail.com">
                  thecodeofsp@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="footer__section footer__socials" aria-labelledby="footer-social-title">
            <h3 id="footer-social-title" className="footer__subtitle">
              Réseaux sociaux
            </h3>
            <div className="footer__icons">
              <a
                href="https://github.com/SandrinePham"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil GitHub de Sandrine Pham"
              >
                <FaGithub aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/sandrinepham69132b145"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn de Sandrine Pham"
              >
                <FaLinkedin aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/thecodeofsp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil Instagram de Sandrine Pham"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Droits */}
        <p className="footer__rights">
          © {currentYear} Sandrine Pham — Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
