# Obtener posts y comentarios por usuario

## 1. Objetivo

Crear una función que permita solicitar por teclado el nombre de un usuario, buscarlo en la API de JSONPlaceholder, obtener sus publicaciones y mostrar los comentarios correspondientes a cada publicación.

La solución utiliza las rutas reales de la API:

- `/users`
- `/users/{id}/posts`
- `/posts/{id}/comments`

---

## 2. Funcionamiento general

El proceso funciona de la siguiente manera:

1. El usuario escribe el nombre de un usuario.
2. Se consulta la ruta `/users`.
3. Se busca el usuario cuyo `name` coincida con el nombre ingresado.
4. Se obtiene el `id` del usuario encontrado.
5. Se consulta `/users/{id}/posts` para obtener sus publicaciones.
6. Se recorre cada publicación.
7. Se consulta `/posts/{post.id}/comments` para obtener sus comentarios.
8. Se muestran en la terminal los posts y sus respectivos comentarios.
9. Si ocurre algún error, se informa al usuario mediante `try...catch`.

---

## 3. Código utilizado

```js
async function obtenerPostsYComentariosPorUsuario(nombre) {

    try {

        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuestaUsuarios.json();

        const usuario = usuarios.find(
            usuario => usuario.name.toLowerCase() === nombre.toLowerCase()
        );

        if (!usuario) {
            console.log("\nUsuario no encontrado.");
            return;
        }

        const respuestaPosts = await fetch(
            `https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`
        );

        const posts = await respuestaPosts.json();

        console.log("\n========================================");
        console.log(`           POSTS DE ${usuario.name}`);
        console.log("========================================");

        for (const post of posts) {

            console.log(`\nPost: ${post.title}`);
            console.log(`Contenido: ${post.body}`);

            const respuestaComentarios = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
            );

            const comentarios = await respuestaComentarios.json();

            console.log("Comentarios:");

            for (const comentario of comentarios) {
                console.log(`- ${comentario.name}: ${comentario.body}`);
            }
        }

    } catch (error) {

        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { obtenerPostsYComentariosPorUsuario };
```

---

## 4. Explicación de las principales instrucciones

### `async function obtenerPostsYComentariosPorUsuario(nombre)`

Se crea la función `obtenerPostsYComentariosPorUsuario` y se recibe como parámetro el nombre ingresado por el usuario.

La palabra `async` permite utilizar `await` dentro de la función.

### `fetch()`

Se utiliza para realizar las solicitudes a la API.

Primero se consulta:

```text
/users
```

para obtener los usuarios.

Después:

```text
/users/{id}/posts
```

para obtener los posts del usuario.

Finalmente:

```text
/posts/{id}/comments
```

para obtener los comentarios de cada post.

### `await`

Permite esperar la respuesta de una petición antes de continuar con el siguiente proceso.

Esto facilita controlar el orden de las operaciones asíncronas.

### `.json()`

Convierte la respuesta recibida de la API en datos que JavaScript puede utilizar.

### `.find()`

Se utiliza para encontrar dentro del arreglo de usuarios al que tenga el mismo nombre que ingresó el usuario.

```js
const usuario = usuarios.find(
    usuario => usuario.name.toLowerCase() === nombre.toLowerCase()
);
```

### `.toLowerCase()`

Convierte ambos textos a minúsculas para permitir la comparación sin importar si el usuario escribió mayúsculas o minúsculas.

Por ejemplo:

```text
Leanne Graham
leanne graham
LEANNE GRAHAM
```

pueden ser comparados correctamente.

### `if (!usuario)`

Comprueba si no se encontró ningún usuario.

Si no existe, se muestra:

```text
Usuario no encontrado.
```

y `return` termina la función.

### `for...of`

Se utiliza para recorrer los posts y posteriormente los comentarios uno por uno.

```js
for (const post of posts)
```

recorre los posts.

```js
for (const comentario of comentarios)
```

recorre los comentarios de cada post.

### `try...catch`

Permite manejar errores que puedan ocurrir durante las solicitudes a la API.

Si ocurre un problema, el programa muestra un mensaje en lugar de detenerse inesperadamente.

### `export`

```js
export { obtenerPostsYComentariosPorUsuario };
```

Permite exportar la función para utilizarla desde otros archivos del proyecto.

---

## 5. Integración con el menú

La función se importa en `menu.js`:

```js
import { obtenerPostsYComentariosPorUsuario } from "./obtenerPostsYComentariosPorUsuario.js";
```

La opción 3 solicita el nombre mediante el `readline` que ya existe en `menu.js`:

```js
case "3":
    entrada.question("Ingrese el nombre del usuario: ", async (nombre) => {
        await obtenerPostsYComentariosPorUsuario(nombre);
        menu();
    });
    return;
```

No se crea otro `readline` dentro de `obtenerPostsYComentariosPorUsuario.js`.

Esto permite mantener el manejo del teclado centralizado en el menú.

---

## 6. Flujo de datos

```text
Usuario escribe un nombre
        ↓
GET /users
        ↓
Buscar usuario por name
        ↓
Obtener ID del usuario
        ↓
GET /users/{id}/posts
        ↓
Obtener posts
        ↓
Recorrer cada post
        ↓
GET /posts/{post.id}/comments
        ↓
Obtener comentarios
        ↓
Mostrar post + comentarios
```

---

## 7. Conceptos aplicados

En esta petición se aplicaron los siguientes conceptos:

- Funciones.
- Parámetros.
- Arrays.
- Objetos.
- `find()`.
- `for...of`.
- Condicionales.
- Operadores de comparación.
- Template literals.
- `fetch`.
- `async/await`.
- Manejo de errores con `try...catch`.
- Módulos ES.
- `export` e `import`.
- Consumo de una API REST.
- Uso de rutas relacionadas entre recursos.

---

## 8. Decisiones técnicas

Se decidió buscar primero al usuario en `/users` porque los objetos de `posts` no contienen una propiedad `name`.

Una vez encontrado el usuario, se utiliza su `id` para consultar directamente sus posts mediante:

```text
/users/{id}/posts
```

Después, cada post se relaciona con sus comentarios mediante:

```text
/posts/{id}/comments
```

De esta manera se utilizan las relaciones existentes en JSONPlaceholder y no se crean rutas que no existen.

---

## 9. Resultado esperado

Al seleccionar la opción 3, el programa solicita:

```text
Ingrese el nombre del usuario:
```

Si el usuario existe, se muestran sus publicaciones:

```text
========================================
           POSTS DE Leanne Graham
========================================

Post: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
Contenido: quia et suscipit...

Comentarios:
- id labore ex et quam laborum: laudantium enim quasi est quidem magnam voluptate ipsam eos
- quo vero reiciendis velit similique earum: est natus enim nihil est dolore omnis voluptatem numquam
```

Si el usuario no existe:

```text
Usuario no encontrado.
```

---

## 10. Conclusión

La Petición 3 permite practicar el consumo de varias rutas relacionadas de una API utilizando programación asíncrona.

El programa recibe un nombre, encuentra al usuario correspondiente, obtiene sus posts y posteriormente obtiene los comentarios de cada publicación.

La solución mantiene una estructura sencilla, utiliza `async/await` y maneja los posibles errores mediante `try...catch`.