// components/DashboardHeader.jsx
import React from 'react';

const DashboardHeader = ({ onLogout }) => (
  <header className="bg-white shadow-sm py-3 sticky-top">
    <div className="container d-flex justify-content-between align-items-center">
      <h2 className="mb-0 text-primary fw-bold">Dashboard</h2>
      <button className="btn btn-outline-danger" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  </header>
);

export default DashboardHeader;
