# Usamos Node 18
FROM node:18

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código
COPY . .

# Comando para arrancar el backend
CMD ["node", "src/index.js"]
