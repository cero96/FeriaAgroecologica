import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return <p className="text-center text-muted">Cargando productos...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (products.length === 0) {
    return <p className="text-muted text-center">No tienes productos.</p>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
