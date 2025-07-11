import React from 'react';

const ProductorCarousel = ({ productores }) => {
  if (!productores || productores.length === 0) return null;

  return (
    <div className="d-flex justify-content-center">
      <div
        id="productoresCarousel"
        className="carousel slide position-relative"
        data-bs-ride="carousel"
        style={{ maxWidth: '700px', width: '100%', position: 'relative' }}
      >
        <div className="carousel-indicators">
          {productores.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#productoresCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? 'active' : ''}
              aria-current={idx === 0 ? 'true' : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          {productores.map((productor, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
              <img
                src={productor.imagen}
                className="d-block w-100"
                alt={productor.nombre}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h5>{productor.nombre}</h5>
                <p>{productor.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Anterior */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productoresCarousel"
          data-bs-slide="prev"
          style={{
            left: '-100px', // fuera de la imagen pero dentro del diseño
            padding: '0 10px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        {/* Botón Siguiente */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productoresCarousel"
          data-bs-slide="next"
          style={{
            right: '-100px', // fuera de la imagen pero dentro del diseño
            padding: '0 10px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default ProductorCarousel;
