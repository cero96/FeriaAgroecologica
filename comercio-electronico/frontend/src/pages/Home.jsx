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
        /* Reset y base */
        body, html, #root {
          margin: 0; padding: 0; min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2e4d25;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-image: url('https://static.vecteezy.com/system/resources/previews/002/834/897/non_2x/light-green-background-with-small-and-big-stars-modern-geometric-abstract-illustration-with-stars-pattern-for-websites-landing-pages-vector.jpg');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          background-attachment: fixed;
          background-color: #d4edda; /* fallback color */
        }

        .container {
          max-width: 1200px;
          margin: 2rem auto 4rem;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
          z-index: 1;
        }

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 3px rgba(46, 77, 37, 0.3);
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
        <h1>Catálogo de Productos Agroecológicos</h1>

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
