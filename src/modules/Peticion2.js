async function peticion2(username) {
    // Definición de una función asíncrona que permite usar 'await' para manejar promesas
    try {
        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        // Extrae y parsea el cuerpo de la respuesta a un objeto/arreglo JavaScript
        const usuarios = await respuestaUsuarios.json();
        // Busca el usuario cuyo username coincida con el proporcionado (ignorando mayúsculas y minúsculas)
        const usuario = usuarios.find(
            usuario => usuario.username.toLowerCase() === username.toLowerCase()
        );

        // Si no se encuentra el usuario, muestra un mensaje y termina la función
        if (!usuario) {
            console.log("\nUsuario no encontrado.");
            return;
        }
        // Muestra los datos del usuario encontrado en la consola
        console.log("\n========================================");
        console.log("             DATOS DEL USUARIO");
        console.log("========================================");

        console.log(`ID: ${usuario.id}`);
        console.log(`Nombre: ${usuario.name}`);
        console.log(`Username: ${usuario.username}`);
        console.log(`Email: ${usuario.email}`);
        console.log(`Teléfono: ${usuario.phone}`);
        console.log(`Website: ${usuario.website}`);

        // Realiza una petición HTTP para obtener los álbumes del usuario encontrado
        const respuestaAlbumes = await fetch(
            `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
        );

        // Convierte la respuesta de álbumes a formato JSON
        const albumes = await respuestaAlbumes.json();

        console.log("\n========================================");
        console.log("                 ÁLBUMES");
        console.log("========================================");

        for (const album of albumes) {
            // Muestra el título de cada álbum en la consola
            console.log(`\nÁlbum: ${album.title}`);
            // Realiza una petición HTTP para obtener las fotos del álbum actual
            const respuestaFotos = await fetch(
                `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
            );
            // Convierte la respuesta de fotos a formato JSON       
            const fotos = await respuestaFotos.json();

            console.log("Fotografías:");
            // Itera sobre las fotos obtenidas y muestra el título de cada una en la consola
            for (const foto of fotos) {
                console.log(`- ${foto.title}`);
            }
        }
        // Llama a la función 'menu' para mostrar el menú nuevamente después de procesar la opción seleccionada
    } catch (error) {
        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { peticion2 };