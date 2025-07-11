import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import AddToCartModal from "../components/AddToCartModal";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/public/catalog")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleConfirmAdd = (quantity) => {
    addToCart({ ...selectedProduct, quantity });
  };

  return (
    <>
      <style>{`
        /* Estilos base y fondo */
        body, html, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2e4d25;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-image: url("Public/images/4.png"); /* ruta corregida */
          background-repeat: no-repeat;
          background-position: center top;
          background-size: cover;
          background-attachment: fixed;
          background-color: #d4edda; /* fallback */
        }

        .container {
          max-width: 1200px;
          margin: 2rem auto 4rem;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          text-align: center; /* centra el h1 */
        }

        h1 {
  color: #f48414ff; /* verde oscuro */
  font-weight: 600;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.25);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  /* Texto con borde negro */
  -webkit-text-stroke: 1px black; /* para navegadores webkit (Chrome, Safari) */
  text-stroke: 1px black; /* soporte futuro */
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; /* sombra negra para reforzar borde en navegadores que no soportan text-stroke */
}


        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="container" role="main" aria-label="Catálogo de productos agroecológicos">
        <h1 className="animate__animated animate__fadeInLeftBig">
          Catálogo de Productos Agroecológicos
        </h1>

        <div className="grid">
          {productos.length === 0 && <p>No hay productos disponibles.</p>}
          {productos.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAdd={handleOpenModal} />
          ))}
        </div>

        {selectedProduct && (
          <AddToCartModal
            product={selectedProduct}
            onConfirm={handleConfirmAdd}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default Home;
