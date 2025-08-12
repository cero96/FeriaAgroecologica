import React, { useState } from "react";

// Convierte un link compartido de Google Drive a un link directo de imagen
function getDirectDriveLink(url) {
  if (!url) return "";
  const match = url.match(/\/d\/([^/]+)\//);
  return match
    ? `https://drive.google.com/uc?export=view&id=${match[1]}`
    : url;
}

const ProductCard = ({ product, onAdd, onEdit, onDelete }) => {
  if (!product) return null;

  const [localStock, setLocalStock] = useState(product.quantityAvailable);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddToCart = () => {
    if (localStock > 0) {
      if (onAdd) {
        onAdd(product, (addedQuantity) => {
          setLocalStock((prevStock) => prevStock - addedQuantity);
        });
      }
    } else {
      alert("🚫 Sin stock disponible");
    }
  };

  return (
    <article
      style={{
        position: "relative",
        width: "300px",
        border: "3px solid #ffa500",
        borderRadius: "16px",
        padding: "16px",
        margin: "16px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        overflow: "hidden",
        transition: "transform 0.3s",
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbI3mJf48bXkR0i-foVynwlGRAHehbwttDw&s')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      tabIndex={0}
      aria-label={`Producto ${product.name}, ${product.description}, disponibles: ${localStock}, precio: $${product.price}`}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {product.photoUrl && (
          <img
            src={getDirectDriveLink(product.photoUrl)}
            alt={`Imagen de ${product.name}`}
            loading="lazy"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          />
        )}
        <h2
          style={{
            margin: "8px 0",
            fontSize: "1.4em",
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          {product.name}
        </h2>

        <p
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#ffd700",
            textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            margin: "4px 0",
          }}
        >
          💰 ${product.price.toFixed(2)}
        </p>

        {/* Botón para alternar la descripción */}
        <p
          onClick={() => setShowDescription(!showDescription)}
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#00ffff",
            margin: "6px 0",
          }}
        >
          {showDescription ? "Ocultar descripción" : "Ver descripción"}
        </p>

        {/* Mostrar descripción solo si está activa */}
        {showDescription && (
          <p
            style={{
              fontSize: "1em",
              margin: "6px 0",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            {product.description}
          </p>
        )}

        <p
          style={{
            fontWeight: "bold",
            margin: "6px 0",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          📦 Disponibles: {localStock}
        </p>

        <p
          style={{
            margin: "6px 0",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          📞 Contacto: {product.user?.name || "-"} ({product.user?.phone || "-"})
        </p>

        {/* Botón Agregar al carrito */}
        {onAdd && (
          <button
            style={{
              border: "none",
              backgroundColor: "#000",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.2s",
              fontSize: "1em",
              fontWeight: "bold",
              marginTop: "12px",
              width: "100%",
            }}
            onClick={handleAddToCart}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ff4500";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🛒 Agregar al carrito
          </button>
        )}

        {/* Botones Editar y Eliminar */}
        {(onEdit || onDelete) && (
          <div className="d-flex gap-2 mt-3 justify-content-center">
            {onEdit && (
              <button
                className="btn btn-sm btn-primary flex-grow-1"
                onClick={() => onEdit(product)}
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-sm btn-danger flex-grow-1"
                onClick={() => onDelete(product.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
