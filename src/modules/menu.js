import readline from "readline";

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

    entrada.question("Seleccione una opción: ", (opcion) => {
        console.log(`\nSeleccionaste la opción: ${opcion}`);
        entrada.close();
    });
}

export { menu };