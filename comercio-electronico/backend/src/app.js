// backend/src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rutas
app.use('/api/users', usersRoutes);

export default app;
