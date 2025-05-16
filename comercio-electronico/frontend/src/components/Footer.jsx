// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; 2025 Feria Agroecológica La Floresta</p>
        <small>Contacta con nosotros en <a href="mailto:info@feriafloresta.ec" className="text-light">info@feriafloresta.ec</a></small>
      </div>
    </footer>
  );
}

export default Footer;
