
# 🌱 Aplicación Web de Comercio Electrónico – Feria Agroecológica La Floresta

Proyecto de titulación desarrollado para la Feria Agroecológica La Floresta en Quito, Ecuador, con el objetivo de fomentar la participación comunitaria, la sostenibilidad local y mejorar la visibilidad de los productos agroecológicos mediante un catálogo virtual informativo.

---

## 📑 Tabla de Contenido

* [Integrantes](#-integrantes)
* [Objetivo General](#-objetivo-general)
* [Herramientas Utilizadas](#-herramientas-utilizadas)
* [Instalación y Configuración](#-instalación-y-configuración)

  * [Backend](#-backend)
  * [Frontend](#-frontend)
  * [Base de datos](#-base-de-datos)
* [Comandos útiles](#-comandos-útiles)

---

## 👨‍💻 Integrantes

* Marco Antonio Gómez Vivar
* Andrés Pedro Tamayo
* Víctor Fernando Guerrero Intriago

---

## 🎯 Objetivo General

Desarrollar una aplicación web que permita a los productores agroecológicos publicar sus productos, artículos informativos y facilitar a los usuarios visualizar la oferta disponible, fomentando el consumo responsable y la educación comunitaria.

---

## 🛠 Herramientas Utilizadas

* **Frontend:** React.js + Vite
* **Backend:** Node.js + Express.js
* **Base de datos:** PostgreSQL + Prisma
* **Pruebas de API:** Postman
* **Control de versiones:** Git y GitHub
* **Despliegue:** Microsoft Azure (futuro)

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd FeriaAgroecologica/comercio-electronico
```

---

## 🔧 Backend

1. **Ir al backend**

   ```bash
   cd backend
   ```
2. **Instalar dependencias**

   ```bash
   npm install
   ```
3. **Configurar variables de entorno**
   Crear un archivo `.env` en la carpeta `backend`:

   ```env
   DATABASE_URL="postgresql://postgres:1234@localhost:5432/Comercio_electronico?schema=public"
   JWT_SECRET="clave_secreta_segura"
   ```
4. **Configurar Prisma**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. **Ejecutar el backend**

   ```bash
   npm run dev
   ```

---

## 🎨 Frontend

1. **Ir al frontend**

   ```bash
   cd ../frontend
   ```
2. **Instalar dependencias**

   ```bash
   npm install
   npm install bootstrap react-bootstrap react-icons axios react-router-dom
   ```
3. **Ejecutar el frontend**

   ```bash
   npm run dev
   ```

   El frontend se ejecutará en:
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🗄 Base de datos

1. Abrir **PgAdmin 4**.
2. Crear una base de datos llamada:

   ```
   Comercio_electronico
   ```
3. Verificar la conexión en el archivo `.env`.

---

## 📌 Comandos útiles

### Prisma

```bash
npx prisma generate        # Generar cliente Prisma
npx prisma migrate dev     # Aplicar migraciones
npx prisma studio          # Visualizar datos de la BD
```

### Git

```bash
git fetch                  # Traer cambios remotos
git pull                   # Descargar y fusionar cambios
git add .                  # Agregar cambios
git commit -m "mensaje"    # Guardar cambios
git push                   # Subir cambios
```

### Dependencias Backend

```bash
npm i --save-dev prisma@latest
npm i @prisma/client@latest
```

### Dependencias Frontend

```bash
npm install react-tsparticles tsparticles
npm install bootstrap react-icons
```

