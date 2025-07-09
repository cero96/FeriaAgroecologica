// src/pages/Productores.jsx
import React from 'react';
import ProductorCarousel from '../components/ProductorCarousel';

const productores = [
  {
    nombre: 'María Gómez',
    descripcion: 'Productora de hortalizas orgánicas en la región andina.',
    imagen: 'https://via.placeholder.com/600x400?text=Maria+Gomez'
  },
  {
    nombre: 'Carlos Pérez',
    descripcion: 'Apicultor especializado en miel ecológica.',
    imagen: 'https://via.placeholder.com/600x400?text=Carlos+Perez'
  },
  {
    nombre: 'Ana Torres',
    descripcion: 'Cultiva café de altura con prácticas sostenibles.',
    imagen: 'https://via.placeholder.com/600x400?text=Ana+Torres'
  }
];

const Productores = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success">Nuestros Productores</h2>
      <ProductorCarousel productores={productores} />
    </div>
  );
};

export default Productores;
