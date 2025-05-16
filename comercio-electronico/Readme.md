Aplicacion web de Comercio Electronico para la Feria AgroEcologica de la FLoresta


Nombres de los integrantes : 

    Marco Antonio Gomez Vivar
    Andres Tamayo 
    Víctor Fernando Guerrero Inttiago

Objetivo General.



Herramientas Utilizadas 

React + vite 
Node.js
Postman 
MongoDB

Comandos para instalar Bibliotecas necesarias



Base de Datos 

+-----------------+        +------------------+
|     Users       |        |     Products     |
+-----------------+        +------------------+
| _id (ObjectId)  |        | _id (ObjectId)   |
| userId (String) |        | productId (String)|
| name (String)   |        | name (String)    |
| email (String)  |        | description (String)|
| phone (String)  |        | category (String)|
| password (String)|       | price (Number)   |
| role (String)   |        | stock (Number)   |
| createdAt (Date)|        | imageUrl (String)|
| updatedAt (Date)|        | createdAt (Date) |
+-----------------+        | updatedAt (Date) |
                           +------------------+

             \                  /
              \                /
               \              /
                \            /
                 \          /
                  \        /
                   \      /
              +-------------------+
              |    UserCatalog    |   (Opcional)
              +-------------------+
              | _id (ObjectId)    |
              | userId (ObjectId) |  <-- referencia a Users._id
              | products: [       |  
              |   {               |
              |    productId (ObjectId),  | <-- referencia a Products._id
              |    addedAt (Date),        |
              |    customPrice (Number),  |
              |    customStock (Number)   |
              |   } ...                 |
              | ]                   |
              | createdAt (Date)     |
              | updatedAt (Date)     |
              +-------------------+



configuracion de la base de datos junto con el servidor la logica del registro de usuario junto con respectivo registro 
falta validar correo 
unir con firebase para inicio de secion con google 
recuperar contrase;a 
y cambiar contrase;a
