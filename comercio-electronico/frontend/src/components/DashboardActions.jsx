import React from 'react';

const DashboardActions = ({ onCreateProduct, onCreateNews }) => (
  <div className="d-flex gap-3 mb-4">
    {/* Botón Nuevo Producto a la izquierda */}
    <button className="btn btn-success shadow-sm" onClick={onCreateProduct}>Nuevo Producto</button>

    {/* Botón Nueva Historia a la derecha */}
    <button className="btn btn-success shadow-sm ms-auto" onClick={onCreateNews}>Nueva Historia</button>
  </div>
);

export default DashboardActions;
