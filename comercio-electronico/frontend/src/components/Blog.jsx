import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Blog.css';

const Blog = ({ items }) => {  // Cambiamos de frutas a items
  return (
    <div id="carouselFloresta" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (  // Cambiamos de fruta a item
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="d-flex justify-content-center">
              <img
                src={item.imagen}
                className="d-block w-75 rounded shadow custom-image"
                alt={item.nombre}
              />
            </div>
            <div className="carousel-caption d-none d-md-block bg-light bg-opacity-75 p-3 rounded custom-caption">
              <h5>{item.nombre}</h5>
              <p>{item.comentario}</p> {/* Cambiamos de beneficios a comentario */}
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselFloresta" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselFloresta" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Blog;