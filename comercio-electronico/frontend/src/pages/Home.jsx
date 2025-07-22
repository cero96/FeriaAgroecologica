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
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2e4d25;
          background-image: url("public/Images/4.png");
          background-repeat: repeat-x;
          background-size: auto 100%;
          background-position: 0 0;
          animation: moveBg 40s ease-in-out infinite alternate;
        }

        @keyframes moveBg {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1000px;
          }
        }

        .hero {
          padding: 5rem 1rem 2rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 2px solid #ddd;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .hero h2 {
  font-size: 3rem;
  font-weight: bold;
  color: #1e3d13; /* Color del texto */
  margin-bottom: 1rem;
  -webkit-text-stroke: 0px white; /* Borde blanco */
  text-stroke: 1px white; /* Para navegadores compatibles */
  text-shadow:
    -1px -1px 0 white,
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white; /* Refuerzo del borde */
}


        .hero p {
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          color: #ffffffff;
        }

        .container {
          max-width: 1200px;
          margin: 2rem auto 4rem;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

       
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        .footer {
          padding: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: #fff;
          background-color: #1e3d13;
          margin-top: 3rem;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }
          .hero h2 {
            font-size: 1.8rem;
          }
          .hero p {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="hero">
        <h2 className="animate__animated animate__fadeInDown">¡Bienvenido a la Feria Agroecológica!</h2>
        <p className="animate__animated animate__fadeInUp">
          Promovemos el consumo responsable y el comercio justo. Explora nuestro catálogo de productos naturales, sostenibles y agroecológicos que ayudan a proteger el planeta.
        </p>
      </div>

      {/* Catálogo */}
      <div className="container" role="main" aria-label="Catálogo de productos agroecológicos">
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
