import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, loading, error, onEdit, onDelete, onView }) => {
  if (loading) return <p className="text-center text-muted">Cargando historias...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blogs || blogs.length === 0) return <p className="text-muted text-center">No hay historias.</p>;

  return (
    <ul className="list-unstyled d-flex flex-column gap-3">
      {blogs.filter(Boolean).map(post => (
        <BlogCard
          key={post.id}
          post={post}          // ⚠️ prop que espera BlogCard
          user={post.user}     // opcional: autor
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default BlogList;
