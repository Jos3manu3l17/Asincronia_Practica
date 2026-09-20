# 02_obtenerTareasPendientesPorUsuario

## Listar tareas pendientes por cada usuario

### Objetivo

Implementar la primera funcionalidad de la actividad utilizando la API pública JSONPlaceholder. El programa consulta los usuarios registrados y todas sus tareas, filtra únicamente las tareas pendientes y las muestra agrupadas por usuario.

### Endpoints utilizados

- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/todos

### Lógica

1. Ejecutar `obtenerTareasPendientesPorUsuario()`.
2. Consultar todos los usuarios.
3. Convertir la respuesta con `.json()`.
4. Consultar todas las tareas.
5. Convertir la respuesta con `.json()`.
6. Recorrer cada usuario.
7. Filtrar tareas cuyo `userId` coincida y cuyo `completed` sea `false`.
8. Mostrar las tareas pendientes de cada usuario.
9. Capturar errores mediante `try/catch`.

### Conexión con el menú

El menú recibe la opción mediante `readline`. Al seleccionar `1`, ejecuta `obtenerTareasPendientesPorUsuario()` y espera a que termine antes de volver a mostrar el menú.

### Código de `src/modules/menu.js`

```js
import readline from "readline";
import { obtenerTareasPendientesPorUsuario } from "./obtenerTareasPendientesPorUsuario.js";

const entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\n========================================");
    console.log("          JSONPLACEHOLDER API");
    console.log("========================================");

    console.log("1. Listar tareas pendientes");
    console.log("2. Buscar usuario y listar álbumes");
    console.log("3. Filtrar posts y agregar comentarios");
    console.log("4. Listar nombre y teléfono de usuarios");
    console.log("5. Consulta completa");
    console.log("0. Salir");

    console.log("========================================");

    entrada.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {
            case "1":
                await obtenerTareasPendientesPorUsuario();
                break;

            case "0":
                console.log("Programa finalizado.");
                entrada.close();
                return;

            default:
                console.log("Opción no válida.");
        }

        menu();
    });
}

export { menu };
```

### Barrel file

`index.js` continúa centralizando las exportaciones:

```js
export * from "./src/modules/menu.js";
export * from "./src/modules/obtenerTareasPendientesPorUsuario.js";
export * from "./src/modules/obtenerUsuarioAlbumesYFotos.js";
export * from "./src/modules/obtenerPostsYComentariosPorUsuario.js";
export * from "./src/modules/transformarUsuariosNombreYTelefono.js";
export * from "./src/modules/obtenerUsuariosConPostsYAlbumes.js";
```

### Arquitectura

```text
app.js
   ↓
index.js
   ↓
menu.js
   ↓
obtenerTareasPendientesPorUsuario.js
   ↓
JSONPlaceholder API
```

### Conceptos aplicados

- Funciones.
- Arrays y objetos.
- `for...of`.
- `filter()`.
- Condicionales.
- `fetch()`.
- Promesas.
- `async/await`.
- `try/catch`.
- ES Modules.
- `readline`.
- Modularización.

### Resultado

Al seleccionar la opción `1`, se ejecuta la primera petición, se muestran las tareas pendientes agrupadas por usuario y, al finalizar, el programa vuelve a mostrar el menú.

### Estado

La primera petición está implementada y conectada al menú.

### Próximo paso

Continuar con la segunda petición.
