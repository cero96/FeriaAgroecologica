// components/DashboardHeader.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const DashboardHeader = ({ onLogout }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'Usuario');
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-sm py-3 sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        <h2 className="mb-0 text-success fw-bold">Hola, {userName}</h2>
        {/* Puedes agregar aquí un botón de cerrar sesión si lo deseas */}
      </div>
    </header>
  );
};

export default DashboardHeader;
