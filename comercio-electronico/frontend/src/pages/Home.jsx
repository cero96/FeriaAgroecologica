import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/public/catalog")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Catálogo de Productos Agroecológicos</h1>
      <div className="row mt-4">
        {productos.length === 0 && <p>No hay productos disponibles.</p>}
        {productos.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card">
              {prod.photoUrl && (
                <img src={prod.photoUrl} className="card-img-top" alt={prod.name} />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p><strong>Disponibles:</strong> {prod.quantityAvailable}</p>
                <p><strong>Contacto:</strong> {prod.user.name} ({prod.user.phone})</p>
                <a href={`https://wa.me/${prod.contactNumber}`} target="_blank" rel="noopener noreferrer">
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
