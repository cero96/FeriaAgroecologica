import React, { useEffect, useState } from 'react';
import Particule from '../components/Particule.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function BlogCard({ post }) {
  return (
    <li
      className="mb-4 p-4 rounded-3 shadow"
      style={{
        wordBreak: 'break-word',
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2
        className="text-truncate fw-bold"
        style={{ maxWidth: '100%', color: '#4b0082' }}
      >
        {post.title}
      </h2>

      {post.user && (
        <p className="mb-1">
          <strong style={{ color: '#333' }}>Autor:</strong>{' '}
          <span style={{ color: '#555' }}>{post.user.name}</span>
        </p>
      )}

      <p className="mb-3" style={{ fontSize: '0.85rem', color: '#888' }}>
        Publicado el {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{
            maxWidth: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '1rem',
          }}
        />
      )}

      <p
        style={{
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
          color: '#333',
          lineHeight: 1.6,
        }}
      >
        {post.description}
      </p>
    </li>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/blogs`);
        if (!res.ok) {
          let errMsg = 'Error al obtener blog posts';
          try {
            const errData = await res.json();
            errMsg = errData.message || errMsg;
          } catch {}
          throw new Error(errMsg);
        }
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

  if (loading) return <p className="text-center mt-5">Cargando blog posts...</p>;
  if (error)
    return (
      <p className="text-danger text-center mt-5">
        Error: {error}
      </p>
    );

  return (
    <>
      <Particule />

      <div className="container mt-5" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="mb-4 text-center" style={{ color: '#4b0082' }}>
          Blog Posts
        </h1>
        {posts.length === 0 ? (
          <p className="text-center">No hay blog posts disponibles.</p>
        ) : (
          <ul className="list-unstyled">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
