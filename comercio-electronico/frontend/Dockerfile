# Usa Node para construir la app
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Construir la app para producción
RUN npm run build

# Servir con Nginx
FROM nginx:alpine

# Copiar build a Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar configuración de Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
