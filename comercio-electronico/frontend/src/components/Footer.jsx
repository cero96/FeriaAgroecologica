import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-column">
          <h5>EcoFeria</h5>
          <ul>
            <li><a href="/about">Sobre Nosotros</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/contact">Contáctanos</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Información</h5>
          <ul>
            <li><a href="/location">Ubicación</a></li>
            <li><a href="/hours">Horario de atención</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Redes Sociales</h5>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 EcoFeria — Agricultura consciente y saludable. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
