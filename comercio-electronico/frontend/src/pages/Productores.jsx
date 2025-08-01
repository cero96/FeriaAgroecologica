import React from 'react';
import ProductorCarousel from '../components/ProductorCarrousel';
import Particule from '../components/Particule'; // importa tu componente Particule

const productores = [
  {
    nombre: 'Leonardo Quilo',
    descripcion: 'Productora de lacteos.',
    imagen: '/Images/Productores/2.png'
  },
  {
    nombre: 'Lucia Espinosa',
    descripcion: 'Agricultor especializado en frutas.',
    imagen: '/Images/Productores/3.png'
  },
  {
    nombre: 'Maria Elvira Perez',
    descripcion: 'Cultiva desde los 5 años',
    imagen: '/Images/Productores/1.png'
  },
];

const Productores = () => {
  return (
    <>
      <Particule /> {/* Partículas de fondo */}
      <div className="container mt-5" style={{ marginBottom: '60px', position: 'relative', zIndex: 1 }}>
        <h2 className="text-center mb-4 text-success">Nuestros Productores</h2>
        <ProductorCarousel productores={productores} />
      </div>
    </>
  );
};

export default Productores;
