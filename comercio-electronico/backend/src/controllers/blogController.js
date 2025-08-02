
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

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear blog (historia)
export const createBlogPost = async (req, res) => {
  try {
    const { title, description, imageUrl, categories = [], tags = [] } = req.body;
    const userId = req.userId; // viene del middleware

    // Validar usuario y obtener tenantId
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(400).json({ error: 'Usuario no válido' });

    const tenantId = user.tenantId;

    const blogPost = await prisma.blogPost.create({
      data: {
        tenantId,
        userId,
        title,
        description,
        imageUrl,
        categories: {
          connect: categories.map(id => ({ id })),
        },
        tags: {
          connect: tags.map(id => ({ id })),
        },
      },
      include: {
        tenant: true,
        user: true,
        categories: true,
        tags: true,
      },
    });

    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creando blogPost:', error);
    res.status(500).json({ error: 'Error al crear el blog', details: error.message });
  }
};

// Obtener todos los blogs (público)
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

// Obtener blog por ID (público)
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

// Actualizar blog (solo autor puede hacerlo)
export const updateBlogPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;
    const { title, description, imageUrl, categories = [], tags = [] } = req.body;

    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!blogPost) return res.status(404).json({ error: 'Blog no encontrado' });

    // Validar autor
    if (blogPost.userId !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar este blog' });
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        categories: {
          set: categories.map(id => ({ id })), // reemplaza categorías
        },
        tags: {
          set: tags.map(id => ({ id })), // reemplaza tags
        },
      },
      include: {
        tenant: true,
        user: true,
        categories: true,
        tags: true,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar blogPost:', error);
    res.status(500).json({ error: 'Error al actualizar el blog', details: error.message });
  }
};

// Eliminar blog (solo autor puede hacerlo)
export const deleteBlogPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;

    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!blogPost) return res.status(404).json({ error: 'Blog no encontrado' });

    // Validar autor
    if (blogPost.userId !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este blog' });
    }

    await prisma.blogPost.delete({ where: { id } });

    res.json({ message: 'Blog eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar blogPost:', error);
    res.status(500).json({ error: 'Error al eliminar el blog', details: error.message });
  }
};
