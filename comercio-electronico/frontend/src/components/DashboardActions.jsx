// components/DashboardActions.jsx
import React from 'react';

const DashboardActions = ({ onCreateProduct, onCreateNews }) => (
  <div className="d-flex gap-3 mb-4">
    <button className="btn btn-primary shadow-sm" onClick={onCreateProduct}>Nuevo Producto</button>
    <button className="btn btn-secondary shadow-sm" onClick={onCreateNews}>Crear Historia</button>
  </div>
);

export default DashboardActions;
