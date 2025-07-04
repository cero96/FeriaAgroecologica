// src/pages/ProductList.jsx
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './ProductList.css';

function ProductList() {
  return (
    <>
      <NavBar />
      <main className="product-list">
        <h1>Productos Disponibles</h1>
        <div className="product-grid">
          {/* Aquí deberías mapear productos desde una API o datos estáticos */}
          <div className="product-card">
            <img src="/path/to/product-image.jpg" alt="Producto" />
            <h3>Producto Ejemplo</h3>
            <p>Precio: $15</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductList;
