async function transformarUsuariosNombreYTelefono  () {

    try {
        // Realizar la petición a la API
        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuesta.json();
        // Modificar la estructura de los datos para mostrar solo el nombre y el teléfono
        const usuariosModificados = usuarios.map(usuario => ({
            nombre: usuario.name,
            telefono: usuario.phone
        }));

        console.log("\n========================================");
        console.log("       NOMBRE Y TELÉFONO DE USUARIOS");
        console.log("========================================");
        // Mostrar los datos modificados en la consola
        for (const usuario of usuariosModificados) {
            console.log(`\nNombre: ${usuario.nombre}`);
            console.log(`Teléfono: ${usuario.telefono}`);
        }

    } catch (error) {
        // Manejar errores en caso de que la petición falle
        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { transformarUsuariosNombreYTelefono   };