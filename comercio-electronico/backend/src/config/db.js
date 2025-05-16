import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Aquí debe coincidir con el .env
    console.log('MongoDB conectado:', process.env.MONGO_URI);
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};
