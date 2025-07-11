const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear historia
exports.createBlog = async (req, res) => {
  try {
    const { tenantId, title, content, imageUrl } = req.body;
    const blog = await prisma.blog.create({
      data: { tenantId, title, content, imageUrl },
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el blog', details: error });
  }
};

// Listar historias
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener blogs' });
  }
};

// Obtener historia por ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!blog) return res.status(404).json({ error: 'Blog no encontrado' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el blog' });
  }
};

// Actualizar historia
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blog = await prisma.blog.update({
      where: { id: parseInt(req.params.id) },
      data: { title, content, imageUrl },
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el blog' });
  }
};

// Eliminar historia
exports.deleteBlog = async (req, res) => {
  try {
    await prisma.blog.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Blog eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el blog' });
  }
};
