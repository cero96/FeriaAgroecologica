// BlogCard.jsx
import React from 'react';

export default function BlogCard({ post, user, onEdit, onDelete }) {
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

      {user && (
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-sm btn-outline-success" onClick={() => onEdit(post)}>
            Editar
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(post.id)}>
            Eliminar
          </button>
        </div>
      )}
    </li>
  );
}
