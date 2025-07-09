import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const Home = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:3000/api/public/catalog")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (quantity <= 0 || quantity > selectedProduct.quantityAvailable) return;
    addToCart({ ...selectedProduct, quantity });
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Catálogo de Productos Agroecológicos</h1>
      <div className="row mt-4">
        {productos.length === 0 && <p>No hay productos disponibles.</p>}
        {productos.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-100">
              {prod.photoUrl && (
                <img src={prod.photoUrl} className="card-img-top" alt={prod.name} />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p><strong>Disponibles:</strong> {prod.quantityAvailable}</p>
                <p><strong>Contacto:</strong> {prod.user.name} ({prod.user.phone})</p>
                <a
                  href={`https://wa.me/${prod.contactNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-success mb-2"
                >
                  Contactar por WhatsApp
                </a>
                <button
                  className="btn btn-sm btn-primary mt-auto"
                  onClick={() => handleOpenModal(prod)}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de cantidad */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Cantidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p><strong>{selectedProduct.name}</strong></p>
              <p>Stock disponible: {selectedProduct.quantityAvailable}</p>
              <input
                type="number"
                className="form-control"
                min={1}
                max={selectedProduct.quantityAvailable}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
