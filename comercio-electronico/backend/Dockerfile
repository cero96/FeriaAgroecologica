FROM node:20-alpine
WORKDIR /app

# Copia dependencias y las instala
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

EXPOSE 3000

# Ejecuta migraciones y levanta la app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
