# Petición 5 — Consulta completa de usuarios

## 1. Objetivo

Consultar todos los usuarios de JSONPlaceholder mediante una única petición inicial y agregar a cada usuario todos sus posts y, dentro de cada post, todos sus comentarios.

Además, se deben agregar a cada usuario todos sus álbumes y, dentro de cada álbum, todas sus fotografías.

La información se organiza directamente dentro de los objetos obtenidos de la API para construir una estructura de datos completa y relacionada.



---

## 2. Requerimiento

> Solicitar todos los usuarios en una única petición, a estos usuarios se les debe agregar todos sus posts y a cada post se le deben agregar todos sus comentarios. Luego a cada usuario le agregamos todos sus álbumes y a cada álbum le agregamos todas sus fotografías.

También se solicita comentar cada línea de código explicando por qué se codificó y qué solución aporta.

---

## 3. Rutas utilizadas

La petición inicial utiliza:

```text
https://jsonplaceholder.typicode.com/users
```

Para los posts de cada usuario:

```text
https://jsonplaceholder.typicode.com/users/{id}/posts
```

Para los comentarios de cada post:

```text
https://jsonplaceholder.typicode.com/posts/{id}/comments
```

Para los álbumes de cada usuario:

```text
https://jsonplaceholder.typicode.com/users/{id}/albums
```

Para las fotografías de cada álbum:

```text
https://jsonplaceholder.typicode.com/albums/{id}/photos
```

Estas rutas permiten relacionar los diferentes recursos de JSONPlaceholder mediante sus identificadores.

---

## 4. Funcionamiento general

El proceso se realiza de la siguiente manera:

```text
GET /users
     ↓
Obtener todos los usuarios
     ↓
Recorrer usuarios
     ↓
Obtener posts del usuario
     ↓
Recorrer posts
     ↓
Obtener comentarios de cada post
     ↓
Agregar comentarios al post
     ↓
Agregar posts al usuario
     ↓
Obtener álbumes del usuario
     ↓
Recorrer álbumes
     ↓
Obtener fotografías de cada álbum
     ↓
Agregar fotografías al álbum
     ↓
Agregar álbumes al usuario
```

---

## 5. Código utilizado

```js
async function peticion5() {

    try {

        // Consultamos todos los usuarios en una única petición.
        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Convertimos la respuesta de la API en un arreglo de JavaScript.
        const usuarios = await respuestaUsuarios.json();

        // Recorremos todos los usuarios obtenidos.
        for (const usuario of usuarios) {

            // Consultamos todos los posts relacionados con el usuario actual.
            const respuestaPosts = await fetch(
                `https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`
            );

            // Convertimos la respuesta de los posts en un arreglo.
            const posts = await respuestaPosts.json();

            // Recorremos cada post del usuario.
            for (const post of posts) {

                // Consultamos todos los comentarios del post actual.
                const respuestaComentarios = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
                );

                // Convertimos los comentarios en un arreglo.
                const comentarios = await respuestaComentarios.json();

                // Agregamos los comentarios al post actual.
                post.comentarios = comentarios;
            }

            // Agregamos todos los posts al usuario actual.
            usuario.posts = posts;

            // Consultamos todos los álbumes relacionados con el usuario actual.
            const respuestaAlbumes = await fetch(
                `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
            );

            // Convertimos la respuesta de los álbumes en un arreglo.
            const albumes = await respuestaAlbumes.json();

            // Recorremos cada álbum del usuario.
            for (const album of albumes) {

                // Consultamos todas las fotografías del álbum actual.
                const respuestaFotos = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
                );

                // Convertimos las fotografías en un arreglo.
                const fotos = await respuestaFotos.json();

                // Agregamos las fotografías al álbum actual.
                album.fotos = fotos;
            }

            // Agregamos todos los álbumes al usuario actual.
            usuario.albumes = albumes;
        }

        // Mostramos un título para identificar el resultado.
        console.log("\n========================================");
        console.log("       CONSULTA COMPLETA DE USUARIOS");
        console.log("========================================");

        // Recorremos nuevamente los usuarios para mostrar el resultado.
        for (const usuario of usuarios) {

            // Mostramos los datos básicos del usuario.
            console.log(`\nUsuario: ${usuario.name}`);

            // Mostramos la cantidad de posts encontrados.
            console.log(`Posts: ${usuario.posts.length}`);

            // Mostramos la cantidad de álbumes encontrados.
            console.log(`Álbumes: ${usuario.albumes.length}`);
        }

    } catch (error) {

        // Mostramos un mensaje si ocurre algún error durante las peticiones.
        console.log("\nOcurrió un error al consultar la API.");

        // Mostramos el mensaje específico del error.
        console.log(error.message);
    }
}

export { peticion5 };
```

---

## 6. Consulta inicial de usuarios

```js
const respuestaUsuarios = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);
```

Esta es la única petición utilizada para obtener inicialmente todos los usuarios.

No se realiza una petición individual para cada usuario.

Después:

```js
const usuarios = await respuestaUsuarios.json();
```

convierte la respuesta recibida en un arreglo que puede ser utilizado por JavaScript.

---

## 7. Recorrido de los usuarios

```js
for (const usuario of usuarios) {
```

Permite recorrer uno por uno todos los usuarios.

Para cada usuario se realizan las consultas necesarias para obtener sus posts y álbumes.

---

## 8. Obtener los posts

```js
const respuestaPosts = await fetch(
    `https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`
);
```

Utiliza el `id` del usuario actual para consultar sus publicaciones.

Por ejemplo, si:

```text
usuario.id = 1
```

la ruta será:

```text
/users/1/posts
```

Después se convierte la respuesta:

```js
const posts = await respuestaPosts.json();
```

---

## 9. Obtener los comentarios de cada post

Para recorrer los posts se utiliza:

```js
for (const post of posts) {
```

Por cada publicación se realiza una nueva consulta:

```js
const respuestaComentarios = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
);
```

La consulta utiliza el identificador del post para obtener sus comentarios.

Después:

```js
const comentarios = await respuestaComentarios.json();
```

convierte la respuesta en un arreglo.

---

## 10. Agregar comentarios al post

La siguiente línea es fundamental:

```js
post.comentarios = comentarios;
```

Permite agregar una nueva propiedad llamada `comentarios` al objeto `post`.

Antes de realizar esta operación, el post contiene información como:

```js
{
    id: 1,
    title: "...",
    body: "...",
    userId: 1
}
```

Después contiene:

```js
{
    id: 1,
    title: "...",
    body: "...",
    userId: 1,
    comentarios: [...]
}
```

De esta manera, cada publicación queda relacionada directamente con sus comentarios.

---

## 11. Agregar posts al usuario

Después de obtener y completar todos los posts:

```js
usuario.posts = posts;
```

Se agrega la propiedad `posts` al usuario.

La estructura queda conceptualmente:

```text
Usuario
 ├── Datos del usuario
 └── posts
      ├── Post
      │    └── comentarios
      ├── Post
      │    └── comentarios
      └── Post
           └── comentarios
```

---

## 12. Obtener los álbumes

Para obtener los álbumes se utiliza:

```js
const respuestaAlbumes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
);
```

La consulta utiliza el ID del usuario.

Después:

```js
const albumes = await respuestaAlbumes.json();
```

convierte la respuesta en un arreglo.

---

## 13. Recorrer los álbumes

```js
for (const album of albumes) {
```

Permite recorrer cada álbum perteneciente al usuario actual.

---

## 14. Obtener las fotografías

Para cada álbum se realiza:

```js
const respuestaFotos = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
);
```

Se utiliza el ID del álbum para obtener sus fotografías.

Después:

```js
const fotos = await respuestaFotos.json();
```

convierte la respuesta en un arreglo.

---

## 15. Agregar fotografías al álbum

```js
album.fotos = fotos;
```

Agrega una propiedad `fotos` al objeto del álbum.

Antes:

```js
{
    id: 1,
    title: "quidem molestiae enim",
    userId: 1
}
```

Después:

```js
{
    id: 1,
    title: "quidem molestiae enim",
    userId: 1,
    fotos: [...]
}
```

De esta forma, cada álbum contiene directamente sus fotografías.

---

## 16. Agregar álbumes al usuario

Finalmente:

```js
usuario.albumes = albumes;
```

agrega todos los álbumes, ya completados con sus fotografías, al usuario.

La estructura final es:

```text
Usuario
│
├── Datos
│
├── Posts
│   ├── Post
│   │   └── Comentarios
│   ├── Post
│   │   └── Comentarios
│   └── ...
│
└── Álbumes
    ├── Álbum
    │   └── Fotografías
    ├── Álbum
    │   └── Fotografías
    └── ...
```

---

## 17. Mostrar el resultado

Después de completar la información se muestra:

```js
console.log("\n========================================");
console.log("       CONSULTA COMPLETA DE USUARIOS");
console.log("========================================");
```

Esto permite identificar claramente el resultado en la terminal.

Después se recorren nuevamente los usuarios:

```js
for (const usuario of usuarios) {
```

y se muestran:

```js
console.log(`\nUsuario: ${usuario.name}`);
console.log(`Posts: ${usuario.posts.length}`);
console.log(`Álbumes: ${usuario.albumes.length}`);
```

De esta manera se presenta un resumen de la información agregada.

---

## 18. Manejo de errores

Toda la operación se encuentra dentro de:

```js
try {
```

y:

```js
catch (error) {
```

Si ocurre algún problema durante las consultas, se muestra:

```js
console.log("\nOcurrió un error al consultar la API.");
console.log(error.message);
```

Esto evita que el programa termine sin informar al usuario qué ocurrió.

---

## 19. Exportación

```js
export { peticion5 };
```

Permite exportar la función para utilizarla desde el resto de la aplicación.

El menú puede importar la función mediante el módulo correspondiente.

---

## 20. Conceptos aplicados

En esta petición se aplicaron:

- Funciones.
- Parámetros y objetos.
- Arrays.
- `for...of`.
- `fetch`.
- `async/await`.
- `try...catch`.
- Template literals.
- Propiedades de objetos.
- Estructuras de datos anidadas.
- Módulos ES.
- `import` y `export`.
- Consumo de una API REST.
- Relación entre recursos mediante IDs.

---

## 21. Decisiones técnicas

Se mantuvo una implementación sencilla utilizando `for...of` y `await`, de manera que cada paso sea fácil de comprender y explicar.

La petición inicial de usuarios se realiza una sola vez mediante `/users`. Posteriormente se utilizan los IDs de esos usuarios para consultar sus recursos relacionados.

También se decidió agregar directamente la información relacionada a los objetos mediante propiedades como:

```js
post.comentarios = comentarios;
usuario.posts = posts;
album.fotos = fotos;
usuario.albumes = albumes;
```

Esto permite construir una estructura anidada que representa la relación entre usuarios, posts, comentarios, álbumes y fotografías.

---

## 22. Estructura final de los datos

El resultado construido por el programa puede representarse de esta manera:

```text
usuarios
│
├── usuario
│   ├── datos
│   ├── posts
│   │   ├── post
│   │   │   └── comentarios
│   │   └── post
│   │       └── comentarios
│   │
│   └── albumes
│       ├── album
│       │   └── fotos
│       └── album
│           └── fotos
│
└── usuario
    └── ...
```

---

## 23. Cumplimiento de la petición

| Requisito | Cumplimiento |
|---|---|
| Consultar todos los usuarios | ✅ |
| Realizar una única petición inicial de usuarios | ✅ |
| Agregar posts a cada usuario | ✅ |
| Agregar comentarios a cada post | ✅ |
| Agregar álbumes a cada usuario | ✅ |
| Agregar fotografías a cada álbum | ✅ |
| Utilizar `fetch` | ✅ |
| Utilizar programación asíncrona | ✅ |
| Manejar errores | ✅ |
| Comentar el código | ✅ |
| Mantener una estructura sencilla | ✅ |

---

## 24. Conclusión

La Petición 5 integra los principales recursos utilizados durante el proyecto.

Se parte de una única consulta inicial de usuarios y, utilizando los identificadores de cada recurso, se construye una estructura de información relacionada que contiene:

- Usuarios.
- Posts.
- Comentarios.
- Álbumes.
- Fotografías.

Esta petición permite aplicar conjuntamente los conceptos de consumo de APIs, programación asíncrona, ciclos, objetos, arreglos y estructuras de datos anidadas.