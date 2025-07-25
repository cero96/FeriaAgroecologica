import React from 'react';

const DashboardActions = ({ onCreateProduct, onCreateNews }) => (
  <div className="d-flex gap-3 mb-4">
    {/* Botón Nuevo Producto a la izquierda */}
    <button className="btn btn-primary shadow-sm" onClick={onCreateProduct}>Nuevo Producto</button>

    {/* Botón Crear Historia a la derecha */}
    <button className="btn btn-primary shadow-sm ms-auto" onClick={onCreateNews}>Crear Historia</button>
  </div>
);

export default DashboardActions;
