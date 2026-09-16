# Pruebas del Proyecto --- Asincronia Practica

Este documento registra las pruebas funcionales realizadas sobre la
aplicación de consultas a la API JSONPlaceholder.

El objetivo es comprobar que cada funcionalidad responde correctamente,
que el menú interactivo funciona y que las entradas proporcionadas por
el usuario producen los resultados esperados.

------------------------------------------------------------------------

## Información general

-   **Proyecto:** Asincronia Practica
-   **Lenguaje:** JavaScript
-   **Entorno:** Node.js
-   **API:** JSONPlaceholder
-   **Tipo de aplicación:** Aplicación de terminal
-   **Archivo de ejecución:** `app.js`

------------------------------------------------------------------------

# 1. Preparación de las pruebas

Antes de comenzar se debe verificar:

-   Node.js instalado.
-   Proyecto ubicado en la carpeta correcta.
-   Conexión a Internet disponible.
-   Archivos guardados.
-   Importaciones y rutas de los módulos funcionando correctamente.

Para ejecutar:

``` bash
node app.js
```

------------------------------------------------------------------------

# 2. Prueba del menú principal

### Resultado esperado

Debe aparecer el menú:

``` text
========================================
          JSONPLACEHOLDER API
========================================

1. Listar tareas pendientes
2. Buscar usuario y listar álbumes
3. Filtrar posts y agregar comentarios
4. Listar nombre y teléfono de usuarios
5. Consulta completa
0. Salir

========================================

Seleccione una opción:
```

### Validaciones

-   [ ] Aparecen las cinco funcionalidades.
-   [ ] La opción `0` permite salir.
-   [ ] El menú vuelve a aparecer después de una consulta.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 3. Prueba --- Petición 1

## Función

`obtenerTareasPendientesPorUsuario()`

### Entrada

Seleccionar:

``` text
1
```

### Resultado esperado

La aplicación debe mostrar los usuarios y únicamente las tareas que
tengan `completed: false`.

Ejemplo:

``` text
========================================
       TAREAS PENDIENTES POR USUARIO
========================================

Usuario: Leanne Graham
- delectus aut autem
- quis ut nam facilis et officia qui
```

### Validaciones

-   [ ] Se consultan los usuarios.
-   [ ] Se consultan las tareas.
-   [ ] Solo aparecen tareas pendientes.
-   [ ] Las tareas corresponden al usuario correcto.
-   [ ] Se manejan errores mediante `try...catch`.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 4. Prueba --- Petición 2

## Función

`obtenerUsuarioAlbumesYFotos(username)`

### Prueba con usuario existente

Seleccionar:

``` text
2
```

Ingresar:

``` text
Bret
```

### Resultado esperado

Se deben mostrar los datos del usuario, sus álbumes y las fotografías de
cada álbum.

### Prueba con usuario inexistente

Ingresar:

``` text
usuarioInexistente
```

### Resultado esperado

``` text
Usuario no encontrado.
```

### Validaciones

-   [ ] Solicita el `username`.
-   [ ] Encuentra usuarios existentes.
-   [ ] La búsqueda no depende de mayúsculas/minúsculas.
-   [ ] Muestra los datos del usuario.
-   [ ] Muestra sus álbumes.
-   [ ] Muestra las fotografías.
-   [ ] Controla usuarios inexistentes.
-   [ ] Maneja errores.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 5. Prueba --- Petición 3

## Función

`obtenerPostsYComentariosPorUsuario(nombre)`

### Prueba con usuario existente

Seleccionar:

``` text
3
```

Ingresar:

``` text
Leanne Graham
```

### Resultado esperado

Debe mostrar los posts del usuario y los comentarios asociados a cada
post.

Ejemplo:

``` text
========================================
           POSTS DE Leanne Graham
========================================

Post: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
Contenido: quia et suscipit...

Comentarios:
- id labore ex et quam laborum: ...
```

### Prueba con usuario inexistente

Ingresar:

``` text
Usuario Que No Existe
```

### Resultado esperado

``` text
Usuario no encontrado.
```

### Validaciones

-   [ ] Solicita el nombre por teclado.
-   [ ] Encuentra correctamente al usuario.
-   [ ] Consulta sus posts.
-   [ ] Consulta los comentarios de cada post.
-   [ ] Muestra los comentarios.
-   [ ] Maneja usuarios inexistentes.
-   [ ] Maneja errores.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 6. Prueba --- Petición 4

## Función

`transformarUsuariosNombreYTelefono()`

### Entrada

Seleccionar:

``` text
4
```

### Resultado esperado

Debe mostrar solamente el nombre y teléfono de cada usuario.

Ejemplo:

``` text
========================================
       NOMBRE Y TELÉFONO DE USUARIOS
========================================

Nombre: Leanne Graham
Teléfono: 1-770-736-8031 x56442
```

### Validaciones

-   [ ] Se consultan todos los usuarios.
-   [ ] Se crea un nuevo arreglo mediante `map()`.
-   [ ] Cada objeto contiene `nombre`.
-   [ ] Cada objeto contiene `telefono`.
-   [ ] No se agregan datos innecesarios.
-   [ ] Se manejan errores.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 7. Prueba --- Petición 5

## Función

`obtenerUsuariosConPostsYAlbumes()`

### Entrada

Seleccionar:

``` text
5
```

### Resultado esperado

La aplicación debe construir las relaciones:

``` text
Usuario
├── Posts
│   └── Comentarios
│
└── Álbumes
    └── Fotografías
```

Debe mostrar un resumen como:

``` text
========================================
       CONSULTA COMPLETA DE USUARIOS
========================================

Usuario: Leanne Graham
Posts: 10
Álbumes: 10
```

### Validaciones

-   [ ] Se obtiene la lista inicial de usuarios.
-   [ ] Se obtienen los posts de cada usuario.
-   [ ] Se obtienen los comentarios de cada post.
-   [ ] Los comentarios se agregan al post correspondiente.
-   [ ] Los posts se agregan al usuario.
-   [ ] Se obtienen los álbumes de cada usuario.
-   [ ] Se obtienen las fotografías de cada álbum.
-   [ ] Las fotografías se agregan al álbum.
-   [ ] Los álbumes se agregan al usuario.
-   [ ] Se manejan errores.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 8. Prueba de navegación del menú

### Secuencia

``` text
1 → Petición 1
2 → Petición 2
3 → Petición 3
4 → Petición 4
5 → Petición 5
0 → Salir
```

### Resultado esperado

Después de cada petición, el menú debe volver a solicitar una opción.

### Validaciones

-   [ ] El menú vuelve después de la petición 1.
-   [ ] El menú vuelve después de la petición 2.
-   [ ] El menú vuelve después de la petición 3.
-   [ ] El menú vuelve después de la petición 4.
-   [ ] El menú vuelve después de la petición 5.
-   [ ] La opción `0` cierra correctamente el programa.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 9. Prueba de opción no válida

### Entrada

``` text
9
```

### Resultado esperado

``` text
Opción no válida.
```

Después debe aparecer nuevamente el menú.

### Validaciones

-   [ ] Detecta la opción incorrecta.
-   [ ] Muestra un mensaje claro.
-   [ ] El programa no se cierra.
-   [ ] El menú vuelve a estar disponible.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 10. Prueba de manejo de errores

Las funciones que realizan consultas utilizan `try...catch` para
controlar posibles errores durante las operaciones asíncronas.

### Resultado esperado

Si ocurre un error debe mostrarse un mensaje similar a:

``` text
Ocurrió un error al consultar la API.
```

### Validaciones

-   [ ] Los errores son capturados.
-   [ ] Se muestra un mensaje comprensible.
-   [ ] El programa no termina inesperadamente.

**Estado:**  Pendiente /  Aprobado

------------------------------------------------------------------------

# 11. Resumen de pruebas

  Prueba   Funcionalidad                             Resultado
  -------- ----------------------------------------- -----------
  1        Menú principal                            ⬜
  2        Petición 1 --- Tareas pendientes          ⬜
  3        Petición 2 --- Usuario, álbumes y fotos   ⬜
  4        Petición 3 --- Posts y comentarios        ⬜
  5        Petición 4 --- Nombre y teléfono          ⬜
  6        Petición 5 --- Consulta completa          ⬜
  7        Navegación del menú                       ⬜
  8        Opción no válida                          ⬜
  9        Manejo de errores                         ⬜

------------------------------------------------------------------------

# 12. Criterio de aprobación

La prueba general se considera satisfactoria cuando:

-   Todas las peticiones pueden ejecutarse desde el menú.
-   Las entradas por teclado funcionan correctamente.
-   Las consultas obtienen información de JSONPlaceholder.
-   Los datos se procesan según cada requerimiento.
-   Las relaciones entre usuarios, posts, comentarios, álbumes y
    fotografías son correctas.
-   Los errores son controlados.
-   El menú permite continuar realizando consultas.
-   La opción de salida finaliza correctamente el programa.

------------------------------------------------------------------------

# 13. Observaciones

Este documento funciona como registro de las pruebas funcionales del
proyecto.

Las casillas pueden marcarse con `✅` después de comprobar cada prueba
directamente desde la terminal.

Las pruebas deben realizarse sobre la versión final del proyecto,
especialmente después de la refactorización de nombres de funciones,
para comprobar que los cambios no hayan afectado las funcionalidades
existentes.
