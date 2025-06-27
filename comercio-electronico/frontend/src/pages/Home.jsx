import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard"; // Importamos el componente ProductCard

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend API
    axios
      .get("http://localhost:3000/api/public/catalog")
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos.");
        setLoading(false);
      });
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

  // Muestra un spinner mientras se cargan los productos
  if (loading) {
    return (
      <div className="container mt-5">
        <h1>Catálogo de Productos Agroecológicos</h1>
        <div>Loading...</div> {/* Aquí puedes poner un spinner de Bootstrap u otro componente */}
      </div>
    );
  }

  // Muestra un mensaje de error si no se pueden cargar los productos
  if (error) {
    return (
      <div className="container mt-5">
        <h1>Catálogo de Productos Agroecológicos</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Catálogo de Productos Agroecológicos</h1>
      <div className="row mt-4">
        {productos.length === 0 && <p>No hay productos disponibles.</p>}
        {productos.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onOpenModal={handleOpenModal}
          />
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
