import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // Ícono de X
import { MdLocationOn, MdEmail } from 'react-icons/md'; // Ubicación y correo

const Footer = () => (
  <footer
    style={{
      background: 'linear-gradient(to bottom, #2e4a30ff, #487249ff, #669868ff)',
      padding: '1rem 1rem',
      fontSize: '1rem',
      color: '#fff',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}
  >
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: '1.5rem',
      }}
    >
      <div style={{ flex: '1 1 200px' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>🌿 Feria Agroecológica</h4>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
      </div>

      <div style={{ flex: '1 1 200px' }}>
        <p style={{ margin: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MdLocationOn color="#e53935" size={20} />
          La Floresta - Galavis 237, Quito 170143
        </p>
        <p style={{ margin: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaWhatsapp color="#000" size={20} />
          +593 999 123 456
        </p>
        <p style={{ margin: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MdEmail color="#fff" size={20} />
          contacto@feriaagroecologica.com
        </p>
      </div>

      <div style={{ flex: '1 1 1px' }}>
        <p style={{ marginBottom: '0.5rem',fontSize:"1.3rem", fontWeight: '600,' }}>Síguenos:</p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '2rem' }}>
          <a href="https://www.facebook.com/people/La-Floresta-Mercado-Agroecol%C3%B3gico/100057415901608/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
            <SiX />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// Enlaces claros sobre fondo verde
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500',
};

export default Footer;
