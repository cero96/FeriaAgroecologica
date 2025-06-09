import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCart } from '../context/CartContext'; // ✅ Importar el contexto del carrito


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState(null);
  const { cart } = useCart(); // ✅ Usar el hook del carrito

  const total = cart.reduce((sum, item) => sum + item.quantity, 0); // ✅ Calcular total

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">FERIA AGROECOLÓGICA</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/comerciantes">Comerciantes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog">Blog</Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item d-flex align-items-center me-3">
                👤 {userName}
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
            </>
          )}
          <li className="nav-item ms-3">
            <Link className="btn btn-outline-primary" to="/cart">
              🛒 Carrito ({total})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
