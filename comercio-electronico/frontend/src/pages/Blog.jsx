import React, { useEffect, useState } from 'react';

export default function BlogPostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Error al obtener blog posts');
        const data = await res.json();
        setPosts(data);
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
    <div className="container mt-4">
      <h1 className="mb-4">Blog Posts</h1>
      {posts.length === 0 && <p>No hay blog posts disponibles.</p>}
      <ul className="list-unstyled">
        {posts.map(({ id, title, description, imageUrl, createdAt, user }) => (
          <li key={id} className="mb-5 p-3 border rounded shadow-sm">
            <h2>{title}</h2>
            {user && <p><strong>Autor:</strong> {user.name}</p>}
            <p><small>Publicado el {new Date(createdAt).toLocaleDateString()}</small></p>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title} 
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} 
                className="mb-3"
              />
            )}
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
