// src/components/Dashboard.jsx
import React from 'react';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido al Panel</h1>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
