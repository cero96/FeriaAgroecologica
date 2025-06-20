import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProductorCarousel.css';

const ProductorCarousel = ({ productores }) => {
  return (
    <div id="carouselProductores" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {productores.map((productor, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="d-flex justify-content-center">
              <img
                src={productor.imagen}
                className="d-block w-50 rounded shadow custom-image"
                alt={productor.nombre}
              />
            </div>
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded custom-caption">
              <h5>👨‍🌾 {productor.nombre}</h5>
              <p>{productor.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselProductores" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselProductores" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default ProductorCarousel;