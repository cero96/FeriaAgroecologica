# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Exponer puerto
EXPOSE 3000

# Ejecutar migraciones y levantar la app en dev
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
