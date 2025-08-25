FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

EXPOSE 3000

# Entrypoint para correr migraciones y luego iniciar en dev
CMD npx prisma migrate dev --name init && npm run dev
