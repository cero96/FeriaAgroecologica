import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';
import productsRouter from './routes/products.js';
import publicRoutes from './routes/public.js';
import orderRoutes from './routes/orders.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como Postman) o que estén en la lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS: Origen no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Quita credentials si no usas cookies, o déjalo en true si usas cookies/sesiones
  credentials: false,
}));

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRouter);
app.use('/api/public', publicRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);

app.use((err, req, res, next) => {
  console.error('🔴 Error:', err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;
