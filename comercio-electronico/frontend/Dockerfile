# Etapa de build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copiamos build a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
