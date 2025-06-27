import React from 'react';
import "../styles/Blog.css";
import Blog from '../components/Blog';

const floresta = [
  {
    nombre: 'Comunidad',
    comentario: 'Recibimos la visitas de todos los lados de la capital.',
    imagen: '/b1.jpg' 
  },
  {
    nombre: 'Vecinos',
    comentario: 'Tenemos el honor de recibir a propios y extrangeros con todo el cariño que nos caracteriza.',
    imagen: '/b2.jpg' 
  },
  {
    nombre: 'Semana Santa',
    comentario: 'Participamos en nuestro tradicional plato, pero la diferencia que esta realizado con nuestros productos organicos.',
    imagen: '/b3.jpg' 
  }
];

const BlogPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-dark">La voz de la comunidad</h1>
      <Blog items={floresta} /> {/* Cambiamos el prop a "items" */}
    </div>
  );
};

export default BlogPage;