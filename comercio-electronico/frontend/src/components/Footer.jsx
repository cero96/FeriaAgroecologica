import React from 'react';

const Footer = () => (
  <footer
    style={{
      backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbI3mJf48bXkR0i-foVynwlGRAHehbwttDw&s')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderTop: '3px solid #ffa500',
      position: 'relative',
      color: '#fff',
      fontSize: '0.9rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '1.5rem 2rem',
    }}
  >
    {/* Overlay para contraste */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 0,
      }}
    />
    
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        textAlign: 'left',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ minWidth: '180px' }}>
        <h5 style={{ marginBottom: '0.3rem', fontWeight: '700' }}>🌱 Feria Agroecológica</h5>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
      </div>

      <div style={{ minWidth: '160px' }}>
        <p style={{ margin: 0 }}>
          📍 <strong>Ubicación:</strong> Av. Principal #123, Ciudad Verde
        </p>
      </div>

      <div style={{ minWidth: '160px' }}>
        <p style={{ margin: 0 }}>
          📞 <strong>Teléfono:</strong> +593 999 123 456
        </p>
      </div>

      <div style={{ minWidth: '180px' }}>
        <p style={{ margin: 0 }}>
          📧 <strong>Email:</strong> contacto@feriaagroecologica.com
        </p>
      </div>

      <div style={{ minWidth: '220px' }}>
        <p style={{ marginBottom: '0.3rem' }}>
          🔗 <strong>Síguenos:</strong>
        </p>
        <div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffa500',
              marginRight: '1rem',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffa500',
              marginRight: '1rem',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#ffa500',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
