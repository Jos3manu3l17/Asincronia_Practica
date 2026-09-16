// Definición de una función asíncrona que permite usar 'await' para manejar promesas
async function obtenerTareasPendientesPorUsuario () {
    try {
        const respuestaUsuarios = await fetch("https://jsonplaceholder.typicode.com/users");

        // Extrae y parsea el cuerpo de la respuesta a un objeto/arreglo JavaScript
        const usuarios = await respuestaUsuarios.json();

        // Segunda petición HTTP para obtener todas las tareas
        const respuestaTareas = await fetch("https://jsonplaceholder.typicode.com/todos");

        // Convierte la respuesta de tareas a formato JSON
        const tareas = await respuestaTareas.json();

        console.log("\n========================================");
        console.log("       TAREAS PENDIENTES POR USUARIO");
        console.log("========================================");

        // Iteración sobre el listado de usuarios obtenidos
        for (const usuario of usuarios) {
            console.log(`\nUsuario: ${usuario.name}`);

            // Filtra solo las tareas que pertenecen al usuario actual (userId) y que NO están completadas
            const tareasPendientes = tareas.filter(
                tarea => tarea.userId === usuario.id && tarea.completed === false
            );

            // Recorre y muestra en consola cada tarea pendiente encontrada
            for (const tarea of tareasPendientes) {
                console.log(`   ${tarea.title}`);
            }
        }

    } catch (error) {
        // Captura cualquier error de red o de parseo de datos ocurrido dentro del bloque 'try'
        console.log("Ocurrio un error al consultar la API.");
        console.log(error.message);
    }
}

// Exportación nombrada de la función para ser utilizada en otros módulos
export { obtenerTareasPendientesPorUsuario  };