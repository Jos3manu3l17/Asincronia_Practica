// Importación del módulo 'readline' para manejar la entrada y salida de la consola
import readline from "readline";

import { peticion1 } from "./peticion1.js";
import { peticion2 } from "./peticion2.js";
import { peticion3 } from "./peticion3.js"; 
// Creación de una interfaz de lectura para capturar la entrada del usuario desde la consola
const entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    // Definición de la función 'menu' que muestra las opciones disponibles al usuario
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

    // Solicita al usuario que seleccione una opción del menú y maneja la respuesta de manera asíncrona
    entrada.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {
            case "1":
                await peticion1();
                break;
                // Maneja la opción 2, solicitando al usuario que ingrese un username y luego llama a la función 'peticion2' con ese username
                    case "2":
                        entrada.question("Ingrese el username del usuario: ", async (username) => {
                            await peticion2(username);
                        });
                        return;

                        case "3":
                            entrada.question("Ingrese el nombre del usuario: ", async (nombre) => {
                                await peticion3(nombre);
                            });
                            return;

            case "0":
                console.log("Programa finalizado.");
                entrada.close();
                return;

            default:
                console.log("Opción no válida.");
        }
        // Llama a la función 'menu' nuevamente para mostrar el menú después de procesar la opción seleccionada
        menu();
    });
}

// Exportación de la función 'menu' para que pueda ser utilizada en otros módulos
export { menu };