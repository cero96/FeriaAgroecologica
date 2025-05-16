// src/components/Dashboard.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="container my-5">
        <h2 className="text-success text-center mb-4">🌿 Bienvenido al Catálogo de Productos</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Producto de ejemplo */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <img src="/assets/lechuga.jpg" className="card-img-top" alt="Lechuga" />
              <div className="card-body">
                <h5 className="card-title">Lechuga Orgánica</h5>
                <p className="card-text">Cultivada sin químicos, ideal para ensaladas frescas.</p>
              </div>
              <div className="card-footer">
                <strong>$1.50 / unidad</strong>
              </div>
            </div>
          </div>

          {/* Puedes seguir agregando más productos así... */}
        </div>

        {/* Bloque informativo */}
        <section className="bg-light p-4 mt-5 rounded shadow-sm">
          <h4>Sobre nuestra feria</h4>
          <p>
            La Feria Agroecológica La Floresta promueve el consumo responsable, el comercio justo y la producción orgánica local.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
