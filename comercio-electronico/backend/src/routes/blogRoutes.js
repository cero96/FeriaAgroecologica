import { Router } from 'express';
import * as blogController from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/blogs - sin token para listar blogs
router.get('/', blogController.getAllBlogPosts);

// POST, PUT, DELETE con token para modificaciones
router.post('/', verifyToken, blogController.createBlogPost);
router.get('/:id', verifyToken, blogController.getBlogPostById);
router.put('/:id', verifyToken, blogController.updateBlogPost);
router.delete('/:id', verifyToken, blogController.deleteBlogPost);

export default router;
