# Imagen base
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json primero (para aprovechar la cache de Docker)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código del backend
COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

# Exponemos el puerto definido en .env (por defecto 3000)
EXPOSE 3000

# Comando por defecto para iniciar el backend
CMD ["npm", "start"]
