# 02_peticion1

## Listar tareas pendientes por cada usuario

### Objetivo

Implementar la primera funcionalidad de la actividad utilizando la API pública JSONPlaceholder. El programa consulta los usuarios registrados y todas sus tareas, filtra únicamente las tareas pendientes y las muestra agrupadas por usuario.

### Endpoints utilizados

- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/todos

### Lógica

1. Ejecutar `peticion1()`.
2. Consultar todos los usuarios.
3. Convertir la respuesta con `.json()`.
4. Consultar todas las tareas.
5. Convertir la respuesta con `.json()`.
6. Recorrer cada usuario.
7. Filtrar tareas cuyo `userId` coincida y cuyo `completed` sea `false`.
8. Mostrar las tareas pendientes de cada usuario.
9. Capturar errores mediante `try/catch`.

### Conexión con el menú

El menú recibe la opción mediante `readline`. Al seleccionar `1`, ejecuta `peticion1()` y espera a que termine antes de volver a mostrar el menú.

### Código de `modulos/menu.js`

```js
import readline from "readline";
import { peticion1 } from "./peticion1.js";

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
                await peticion1();
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
export * from "./modulos/menu.js";
export * from "./modulos/peticion1.js";
export * from "./modulos/peticion2.js";
export * from "./modulos/peticion3.js";
export * from "./modulos/peticion4.js";
export * from "./modulos/peticion5.js";
```

### Arquitectura

```text
app.js
   ↓
index.js
   ↓
menu.js
   ↓
peticion1.js
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
