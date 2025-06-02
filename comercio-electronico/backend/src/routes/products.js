// backend/src/routes/products.js
import express from 'express';
import {
  createProduct,
  updateProduct,
  getProducts,
} from '../controllers/productsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // Aplica el middleware JWT a todas las rutas

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/', getProducts);

export default router;
