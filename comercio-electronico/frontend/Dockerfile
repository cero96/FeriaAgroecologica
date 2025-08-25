# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# Servir con serve
FROM node:20-alpine
WORKDIR /app

# Instalar serve
RUN npm install -g serve

# Copiar build del frontend
COPY --from=build /app/dist ./dist

# Exponer puerto
EXPOSE 3001

# Servir la app
CMD ["serve", "-s", "dist", "-l", "3001"]
