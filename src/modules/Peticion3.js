async function peticion3(nombre) {

    try {
        // Realiza una petición HTTP para obtener todos los usuarios desde la API
        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuestaUsuarios.json();
        // Busca el usuario cuyo nombre coincida con el proporcionado (ignorando mayúsculas y minúsculas)
        const usuario = usuarios.find(
            usuario => usuario.name.toLowerCase() === nombre.toLowerCase()
        );
        // Si no se encuentra el usuario, muestra un mensaje y termina la función
        if (!usuario) {
            console.log("\nUsuario no encontrado.");
            return;
        }
        // Muestra los datos del usuario encontrado en la consola
        const respuestaPosts = await fetch(
            `https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`
        );
        // Convierte la respuesta de posts a formato JSON
        const posts = await respuestaPosts.json();

        // Muestra los posts del usuario encontrado en la consola
        console.log("\n========================================");
        console.log(`           POSTS DE ${usuario.name}`);
        console.log("========================================");

        for (const post of posts) {
            // Muestra el título y contenido de cada post en la consola
            console.log(`\nPost: ${post.title}`);
            console.log(`Contenido: ${post.body}`);
            // Realiza una petición HTTP para obtener los comentarios del post actual
            const respuestaComentarios = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
            );
            // Convierte la respuesta de comentarios a formato JSON
            const comentarios = await respuestaComentarios.json();

            console.log("Comentarios:");
            // Itera sobre los comentarios obtenidos y muestra el nombre del autor y el contenido de cada comentario en la consola
            for (const comentario of comentarios) {
                console.log(`- ${comentario.name}: ${comentario.body}`);
            }
        }

    } catch (error) {

        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { peticion3 };