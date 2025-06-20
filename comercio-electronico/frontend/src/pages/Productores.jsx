// src/pages/Productores.jsx
import React from 'react';
import ProductorCarousel from '../components/ProductorCarousel';

const productores = [
  {
    nombre: 'María Gómez',
    descripcion: 'Productora de hortalizas orgánicas en la región andina.',
    imagen: '/Maria.jpg' 
  },
  {
    nombre: 'Elvira Pérez',
    descripcion: 'Productora especializada en frutas organicas.',
    imagen: '/Elvira.jpg'
  },
  {
    nombre: 'Ana Torres',
    descripcion: 'Cultiva café de altura con prácticas sostenibles.',
    imagen: '/Ana.jpg' 
  }
];

const Productores = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-success">Nuestros Productores</h1>
      <ProductorCarousel productores={productores} />
    </div>
  );
};

export default Productores;