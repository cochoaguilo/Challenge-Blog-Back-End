# Challenge Blog – Back-End

API REST para un blog, desarrollada con **Node.js, Express y Sequelize** sobre **MySQL**. Es el back-end del challenge de blog; el front-end está en [Challenge-Blog-front-end](https://github.com/cochoaguilo/Challenge-Blog-front-end).

## Tecnologías

- Node.js · Express
- Sequelize (consultas SQL) · MySQL (`mysql2`)
- CORS, body-parser, nodemon

## Estructura

```
├── index.js                      # servidor Express
├── conexion.js                   # conexión a MySQL con Sequelize
├── routes/blogs.routes.js        # rutas /blogs
└── controllers/blogs.controllers.js
```

## Base de datos

Usa una base MySQL llamada `challenge_blog` con dos tablas:

- `Blog`: `id`, `Titulo`, `Contenido`, `Imagen`, `Fecha`, `id_categoria`
- `Categoria`: `id_categoria`, `name`

La cadena de conexión se configura en `conexion.js`.

## Endpoints

| Método | Ruta          | Descripción                                          |
| ------ | ------------- | ---------------------------------------------------- |
| GET    | `/blogs`      | Lista los posts (id, título, imagen, fecha, categoría), del más reciente al más antiguo |
| GET    | `/blogs/:id`  | Detalle de un post                                   |
| POST   | `/blogs`      | Crea un post                                         |
| PATCH  | `/blogs/:id`  | Actualiza un post                                    |
| DELETE | `/blogs/:id`  | Elimina un post                                      |

Ejemplo de body para `POST` / `PATCH`:

```json
{
  "title": "Mi primer post",
  "content": "Contenido del post",
  "image": "https://ejemplo.com/imagen.jpg",
  "date": "2021-05-20",
  "category": "Tecnología"
}
```

`category` es el nombre de una categoría ya existente en la tabla `Categoria`.

## Cómo correrlo

Requisitos: Node.js y un servidor MySQL con la base `challenge_blog` creada.

```bash
npm install
node index.js
```

El servidor escucha en el puerto definido en la variable de entorno `port`, o en el `4700` por defecto.
