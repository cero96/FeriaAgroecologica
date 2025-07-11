import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState(null);
  const { items: cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'Usuario');
      } catch (error) {
        console.error("Error al decodificar token:", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbI3mJf48bXkR0i-foVynwlGRAHehbwttDw&s')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '3px solid #ffa500', // 🔥 contorno fuego
        position: 'relative',
        color: '#fff',
      }}
    >
      {/* Overlay oscuro para contraste */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 0,
        }}
      ></div>

      <div className="container-fluid" style={{ position: 'relative', zIndex: 1 }}>
        <Link className="navbar-brand text-white fw-bold" to="/">
          🌱 FERIA AGROECOLÓGICA
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/productores">Comerciantes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/blog">Blog</Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {token ? (
              <>
                <li className="nav-item text-white me-3">
                  👤 {userName}
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light fw-bold"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Registrarse</Link>
                </li>
              </>
            )}
            <li className="nav-item ms-3">
              <Link className="btn btn-light text-dark fw-bold" to="/cart">
                🛒 ({total})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
