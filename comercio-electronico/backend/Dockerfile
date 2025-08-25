# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
