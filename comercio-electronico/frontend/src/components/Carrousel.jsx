// src/components/Carrousel.jsx
import React from 'react';

const Carrousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="carousel-item active">
          <img
            src="https://via.placeholder.com/600x300?text=Imagen+1"
            className="d-block w-100"
            alt="Imagen 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/600x300?text=Imagen+2"
            className="d-block w-100"
            alt="Imagen 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/600x300?text=Imagen+3"
            className="d-block w-100"
            alt="Imagen 3"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        style={{ filter: 'invert(1)' }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
        style={{ filter: 'invert(1)' }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrousel;
