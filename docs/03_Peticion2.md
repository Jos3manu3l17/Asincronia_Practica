# 03_peticion2

## Buscar usuario y listar álbumes con sus fotografías

### Objetivo

Implementar la segunda funcionalidad de la actividad utilizando la API pública JSONPlaceholder.

El programa solicita por teclado el `username` de un usuario, busca la coincidencia en la API y, si existe, muestra sus datos, todos sus álbumes y las fotografías correspondientes a cada álbum.

### Endpoints utilizados

- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/users/{id}/albums`
- `https://jsonplaceholder.typicode.com/albums/{id}/photos`

### Lógica de la funcionalidad

1. El menú solicita al usuario el `username`.
2. El `username` se envía a `peticion2()`.
3. Se consulta `/users`.
4. Se convierte la respuesta con `.json()`.
5. Se utiliza `find()` para buscar el usuario cuyo `username` coincida.
6. Se valida si el usuario existe.
7. Si no existe, se muestra un mensaje y termina la petición.
8. Si existe, se muestran sus datos principales.
9. Se consultan los álbumes utilizando el `id` del usuario.
10. Se recorren los álbumes.
11. Para cada álbum se consultan sus fotografías utilizando el `id` del álbum.
12. Se recorren y muestran las fotografías.
13. Los errores se controlan mediante `try/catch`.

### Manejo de entrada por teclado

Inicialmente `peticion2.js` tenía su propio objeto `readline`. Esto generaba conflicto porque `menu.js` ya controlaba la entrada de la terminal.

Para solucionarlo, se dejó una sola instancia de `readline` en `menu.js`.

Ahora el menú recibe el `username` y se lo entrega a `peticion2(username)`.

### Código de `peticion2.js`

```js
async function peticion2(username) {

    try {
        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuestaUsuarios.json();

        const usuario = usuarios.find(
            usuario => usuario.username.toLowerCase() === username.toLowerCase()
        );

        if (!usuario) {
            console.log("\nUsuario no encontrado.");
            return;
        }

        console.log("\n========================================");
        console.log("             DATOS DEL USUARIO");
        console.log("========================================");

        console.log(`ID: ${usuario.id}`);
        console.log(`Nombre: ${usuario.name}`);
        console.log(`Username: ${usuario.username}`);
        console.log(`Email: ${usuario.email}`);
        console.log(`Teléfono: ${usuario.phone}`);
        console.log(`Website: ${usuario.website}`);

        const respuestaAlbumes = await fetch(
            `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
        );

        const albumes = await respuestaAlbumes.json();

        console.log("\n========================================");
        console.log("                 ÁLBUMES");
        console.log("========================================");

        for (const album of albumes) {

            console.log(`\nÁlbum: ${album.title}`);

            const respuestaFotos = await fetch(
                `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
            );

            const fotos = await respuestaFotos.json();

            console.log("Fotografías:");

            for (const foto of fotos) {
                console.log(`- ${foto.title}`);
            }
        }

    } catch (error) {
        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { peticion2 };
```

### Conexión con el menú

En `menu.js` se importa la función:

```js
import { peticion2 } from "./peticion2.js";
```

Cuando se selecciona la opción `2`, se solicita el username y se ejecuta la petición:

```js
case "2":
    entrada.question("Ingrese el username del usuario: ", async (username) => {
        await peticion2(username);
        menu();
    });
    return;
```

### ¿Por qué se utiliza `await`?

`peticion2()` es una función asíncrona porque realiza peticiones con `fetch()`.

El `await` permite esperar la finalización de la petición antes de continuar con el siguiente paso de la función.

El flujo es:

```text
username
   ↓
/users
   ↓
buscar usuario
   ↓
/users/{id}/albums
   ↓
recorrer álbumes
   ↓
/albums/{id}/photos
   ↓
mostrar fotografías
```

### Validación

Se valida que el usuario exista:

```js
if (!usuario) {
    console.log("Usuario no encontrado.");
    return;
}
```

Además, el código utiliza `try/catch` para controlar errores producidos durante las consultas a la API.

### Conceptos aplicados

- Funciones.
- Parámetros.
- Arrays y objetos.
- `find()`.
- `for...of`.
- Condicional `if`.
- Template literals.
- `fetch()`.
- Promesas.
- `async/await`.
- `try/catch`.
- ES Modules.
- `readline`.
- Modularización.
- Relaciones entre recursos de una API.

### Resultado

Al seleccionar la opción `2`, el programa solicita un `username`. Si encuentra una coincidencia, muestra los datos del usuario, sus álbumes y las fotografías de cada álbum. Al finalizar, retorna al menú.

### Estado

La segunda petición está implementada y conectada al menú.

### Próximo paso

Continuar con la tercera petición de la actividad.
