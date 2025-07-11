import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear historia
export const createBlogPost = async (req, res) => {
  try {
    const { tenantId, userId, title, description, imageUrl } = req.body;
    const blogPost = await prisma.blogPost.create({
      data: { tenantId, userId, title, description, imageUrl },
    });
    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creando blogPost:', error);
    res.status(500).json({ error: 'Error al crear el blog', details: error.message });
  }
};

// Listar historias
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      include: {
        tenant: true,
        user: true,
        categories: true,
        tags: true,
      },
    });
    res.json(blogPosts);
  } catch (error) {
    console.error('Error al obtener blogPosts:', error);
    res.status(500).json({ error: 'Error al obtener blogs', details: error.message });
  }
};

// Obtener historia por ID
export const getBlogPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        tenant: true,
        user: true,
        categories: true,
        tags: true,
      },
    });
    if (!blogPost) return res.status(404).json({ error: 'Blog no encontrado' });
    res.json(blogPost);
  } catch (error) {
    console.error('Error al obtener blogPost:', error);
    res.status(500).json({ error: 'Error al obtener el blog', details: error.message });
  }
};

// Actualizar historia
export const updateBlogPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, imageUrl } = req.body;
    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: { title, description, imageUrl },
    });
    res.json(blogPost);
  } catch (error) {
    console.error('Error al actualizar blogPost:', error);
    res.status(500).json({ error: 'Error al actualizar el blog', details: error.message });
  }
};

// Eliminar historia
export const deleteBlogPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.blogPost.delete({
      where: { id },
    });
    res.json({ message: 'Blog eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar blogPost:', error);
    res.status(500).json({ error: 'Error al eliminar el blog', details: error.message });
  }
};
