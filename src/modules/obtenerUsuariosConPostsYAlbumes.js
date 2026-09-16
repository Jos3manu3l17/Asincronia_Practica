async function obtenerUsuariosConPostsYAlbumes  () {

    try {

        // Consultamos todos los usuarios en una única petición.
        const respuestaUsuarios = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Convertimos la respuesta de la API en un arreglo de JavaScript.
        const usuarios = await respuestaUsuarios.json();

        // Recorremos todos los usuarios obtenidos.
        for (const usuario of usuarios) {

            // Consultamos todos los posts relacionados con el usuario actual.
            const respuestaPosts = await fetch(
                `https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`
            );

            // Convertimos la respuesta de los posts en un arreglo.
            const posts = await respuestaPosts.json();

            // Recorremos cada post del usuario.
            for (const post of posts) {

                // Consultamos todos los comentarios del post actual.
                const respuestaComentarios = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
                );

                // Convertimos los comentarios en un arreglo.
                const comentarios = await respuestaComentarios.json();

                // Agregamos los comentarios al post actual.
                post.comentarios = comentarios;
            }

            // Agregamos todos los posts al usuario actual.
            usuario.posts = posts;

            // Consultamos todos los álbumes relacionados con el usuario actual.
            const respuestaAlbumes = await fetch(
                `https://jsonplaceholder.typicode.com/users/${usuario.id}/albums`
            );

            // Convertimos la respuesta de los álbumes en un arreglo.
            const albumes = await respuestaAlbumes.json();

            // Recorremos cada álbum del usuario.
            for (const album of albumes) {

                // Consultamos todas las fotografías del álbum actual.
                const respuestaFotos = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
                );

                // Convertimos las fotografías en un arreglo.
                const fotos = await respuestaFotos.json();

                // Agregamos las fotografías al álbum actual.
                album.fotos = fotos;
            }

            // Agregamos todos los álbumes al usuario actual.
            usuario.albumes = albumes;
        }

        // Mostramos un título para identificar el resultado.
        console.log("\n========================================");
        console.log("       CONSULTA COMPLETA DE USUARIOS");
        console.log("========================================");

        // Recorremos nuevamente los usuarios para mostrar el resultado.
        for (const usuario of usuarios) {

            // Mostramos los datos básicos del usuario.
            console.log(`\nUsuario: ${usuario.name}`);

            // Mostramos la cantidad de posts encontrados.
            console.log(`Posts: ${usuario.posts.length}`);

            // Mostramos la cantidad de álbumes encontrados.
            console.log(`Álbumes: ${usuario.albumes.length}`);
        }

    } catch (error) {

        // Mostramos un mensaje si ocurre algún error durante las peticiones.
        console.log("\nOcurrió un error al consultar la API.");

        // Mostramos el mensaje específico del error.
        console.log(error.message);
    }
}

export { obtenerUsuariosConPostsYAlbumes   };