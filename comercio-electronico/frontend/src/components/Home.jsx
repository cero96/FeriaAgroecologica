// src/components/Home.jsx
import React from 'react';

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="text-center text-success mb-4">Bienvenido a nuestro Catálogo</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <img src="/assets/frutas.jpg" className="card-img-top" alt="Frutas orgánicas" />
            <div className="card-body">
              <h5 className="card-title">Frutas Frescas</h5>
              <p className="card-text">Productos 100% naturales cosechados por agricultores locales.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <img src="/assets/verduras.jpg" className="card-img-top" alt="Verduras agroecológicas" />
            <div className="card-body">
              <h5 className="card-title">Verduras Ecológicas</h5>
              <p className="card-text">Directas del huerto a tu hogar, sin químicos ni pesticidas.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 p-4 bg-light rounded border">
        <h4 className="text-success">¿Por qué elegirnos?</h4>
        <p>Feria Agroecológica La Floresta promueve el consumo responsable y el comercio justo entre productores y consumidores. ¡Súmate al cambio!</p>
      </div>
    </div>
  );
}

export default Home;
