import React from 'react';
import ProductorCarousel from '../components/ProductorCarrousel';

const productores = [
  {
    nombre: 'María Gómez',
    descripcion: 'Productora de lacteos.',
    imagen: '/Images/Productores/1.png'
  },
  {
    nombre: 'Carlos Pérez',
    descripcion: 'Agricultor especializado en frutas.',
    imagen: '/Images/Productores/3.png'
  },
  {
    nombre: 'Ana Torres',
    descripcion: 'Cultiva desde los 5 años',
    imagen: '/Images/Productores/2.png'
  },
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
