import React, { useEffect, useState } from 'react';
import Particule from '../components/Particule.jsx'; // Asegúrate que la ruta sea correcta

function BlogCard({ post }) {
  return (
    <li
      className="mb-4 p-3 border rounded shadow-sm bg-white"
      style={{ wordBreak: 'break-word' }}
    >
      <h2 className="text-truncate" style={{ maxWidth: '100%' }}>{post.title}</h2>
      {post.user && <p><strong>Autor:</strong> {post.user.name}</p>}
      <p><small>Publicado el {new Date(post.createdAt).toLocaleDateString()}</small></p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
          className="mb-3"
        />
      )}
      <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{post.description}</p>
    </li>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch('http://localhost:3000/api/blogs');
        if (!res.ok) throw new Error('Error al obtener blog posts');

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  if (loading) return <p>Cargando blog posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Fondo de partículas */}
      <Particule />

      {/* Contenedor principal con z-index para estar encima */}
      <div className="container mt-4" style={{ position: 'relative', zIndex: 1 }}>
        <h1>Blog Posts</h1>
        {posts.length === 0 ? (
          <p>No hay blog posts disponibles.</p>
        ) : (
          <ul className="list-unstyled">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
