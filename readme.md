# JSONPlaceholder API — Aplicación de Consultas Asíncronas

Aplicación desarrollada en **JavaScript con Node.js** que permite realizar diferentes consultas sobre la API pública **JSONPlaceholder** desde la terminal.

El proyecto fue desarrollado con una estructura modular, utilizando **ES Modules**, un **barrel file**, un menú interactivo y programación asíncrona mediante `async/await`.

El objetivo principal es aplicar de manera práctica conceptos fundamentales de JavaScript, especialmente el consumo de APIs, manejo de datos, funciones asíncronas, arreglos, objetos, ciclos, filtros y transformación de información.

---

## Descripción del proyecto

La aplicación funciona desde la terminal y presenta un menú interactivo mediante el cual el usuario puede seleccionar diferentes operaciones relacionadas con los recursos disponibles en JSONPlaceholder.

Las consultas trabajan principalmente con:

- Usuarios
- Posts
- Comentarios
- Álbumes
- Fotografías
- Tareas

Cada funcionalidad está separada en su propio módulo para mantener una estructura organizada y facilitar el mantenimiento del código.

---

## Objetivos

### Objetivo general

Desarrollar una aplicación en JavaScript capaz de consumir y procesar información de una API pública mediante peticiones asíncronas, aplicando una estructura modular y organizada.

### Objetivos específicos

- Consumir información desde una API REST pública.
- Utilizar `fetch()` para realizar peticiones HTTP.
- Aplicar `async/await` para trabajar con operaciones asíncronas.
- Comprender el flujo de ejecución de las peticiones.
- Procesar arreglos y objetos obtenidos desde la API.
- Utilizar métodos como `filter()`, `find()` y `map()`.
- Aplicar ciclos `for...of`.
- Implementar condiciones para controlar la información.
- Manejar errores mediante `try...catch`.
- Crear módulos independientes para cada funcionalidad.
- Implementar un archivo central de exportaciones mediante un barrel file.
- Crear un menú interactivo para controlar las diferentes funcionalidades.
- Mantener una estructura de proyecto clara y fácil de mantener.

---

# Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| JavaScript | Lenguaje principal |
| Node.js | Ejecución del proyecto desde la terminal |
| Fetch API | Consumo de la API |
| JSONPlaceholder | API REST utilizada |
| ES Modules | Modularización del proyecto |
| Git | Control de versiones |
| GitHub | Repositorio y gestión del proyecto |
| Markdown | Documentación |

---

# API utilizada

El proyecto utiliza **JSONPlaceholder**, una API REST pública creada para realizar pruebas y prácticas de desarrollo.

**API:** JSONPlaceholder

[Sitio oficial de JSONPlaceholder](https://jsonplaceholder.typicode.com/?utm_source=chatgpt.com)

Los principales recursos utilizados son:

```text
/users
/posts
/comments
/albums
/photos
/todos
```

También se utilizan rutas relacionadas entre recursos, por ejemplo:

```text
/users/{id}/posts
/users/{id}/albums
/posts/{id}/comments
/albums/{id}/photos
```

Estas rutas permiten relacionar la información obtenida desde diferentes recursos.

---

# Funcionalidades

La aplicación cuenta con cinco funcionalidades principales.

## Tareas pendientes por usuario

Consulta los usuarios registrados y sus tareas.

La aplicación obtiene los usuarios y las tareas desde la API y posteriormente identifica únicamente las tareas que todavía no están completadas.

### Proceso

```text
Usuarios
   ↓
Tareas
   ↓
Filtrar tareas pendientes
   ↓
Relacionar tareas con cada usuario
   ↓
Mostrar resultado
```

Se utiliza:

- `fetch()`
- `async/await`
- `filter()`
- `for...of`
- Condiciones
- `try...catch`

Documentación detallada:

[`docs/02_peticion1.md`](docs/02_peticion1.md)

---

## Buscar usuario, álbumes y fotografías

Permite ingresar por teclado el `username` de un usuario.

Después de encontrarlo, la aplicación muestra sus datos y consulta todos sus álbumes junto con las fotografías correspondientes.

### Proceso

```text
Ingresar username
        ↓
Consultar usuarios
        ↓
Buscar usuario
        ↓
Obtener ID
        ↓
Consultar álbumes
        ↓
Consultar fotografías
        ↓
Mostrar información
```

Se utiliza:

- `find()`
- `toLowerCase()`
- `fetch()`
- `async/await`
- `for...of`
- Parámetros dinámicos en las URLs
- Manejo de errores

Documentación detallada:

[`docs/03_peticion2.md`](docs/03_peticion2.md)

---

## Posts y comentarios de un usuario

Permite ingresar el nombre de un usuario.

La aplicación busca al usuario y posteriormente consulta sus publicaciones y los comentarios asociados a cada publicación.

### Proceso

```text
Ingresar nombre
      ↓
Buscar usuario
      ↓
Obtener ID
      ↓
Consultar posts
      ↓
Recorrer posts
      ↓
Consultar comentarios
      ↓
Mostrar resultado
```

Una publicación no contiene directamente sus comentarios, por lo que se realiza una consulta adicional utilizando el identificador del post.

Se utilizan rutas como:

```text
/users/{id}/posts
/posts/{id}/comments
```

Documentación detallada:

[`docs/04_peticion3.md`](docs/04_peticion3.md)

---

## Transformación de usuarios

Consulta todos los usuarios y transforma la información obtenida en un nuevo arreglo que contiene únicamente:

- Nombre
- Teléfono

Ejemplo:

```javascript
const usuariosModificados = usuarios.map(usuario => ({
    nombre: usuario.name,
    telefono: usuario.phone
}));
```

La información original no se utiliza directamente para mostrar todos sus campos. En su lugar, se genera un nuevo arreglo con solamente los datos solicitados.

### Proceso

```text
Consultar usuarios
       ↓
Obtener arreglo original
       ↓
Recorrer usuarios con map()
       ↓
Crear nuevos objetos
       ↓
Conservar nombre y teléfono
       ↓
Mostrar resultado
```

Documentación detallada:

[`docs/05_peticion4.md`](docs/05_peticion4.md)

---

## Consulta completa de usuarios

Esta funcionalidad construye una estructura más completa de información.

Primero se consultan todos los usuarios mediante una petición inicial y posteriormente se agregan sus relaciones:

```text
Usuario
│
├── Posts
│   ├── Comentarios
│   ├── Comentarios
│   └── ...
│
└── Álbumes
    ├── Fotografías
    ├── Fotografías
    └── ...
```

Para cada usuario se consultan:

- Sus posts.
- Los comentarios de cada post.
- Sus álbumes.
- Las fotografías de cada álbum.

La información obtenida se agrega directamente a los objetos correspondientes.

Por ejemplo:

```javascript
post.comentarios = comentarios;
usuario.posts = posts;

album.fotos = fotos;
usuario.albumes = albumes;
```

### Proceso general

```text
                 USUARIOS
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
        POSTS              ÁLBUMES
          │                   │
          ↓                   ↓
   COMENTARIOS            FOTOGRAFÍAS
```

Documentación detallada:

[`docs/06_peticion5.md`](docs/06_peticion5.md)

---

# Estructura del proyecto

El proyecto está organizado mediante módulos independientes para separar las diferentes responsabilidades.

```text
proyecto-api/
│
├── 📁 docs/
│   ├── 01_inicializacion_y_estructura.md
│   ├── 02_peticion1.md
│   ├── 03_peticion2.md
│   ├── 04_peticion3.md
│   ├── 05_peticion4.md
│   └── 06_peticion5.md
│
├── 📁 modulos/
│   ├── menu.js
│   ├── peticion1.js
│   ├── peticion2.js
│   ├── peticion3.js
│   ├── peticion4.js
│   └── peticion5.js
│
├── app.js
├── index.js
├── package.json
└── .gitignore
```

---

# Arquitectura del proyecto

Se utilizó una estructura modular para evitar colocar toda la lógica en un único archivo.

Cada archivo tiene una responsabilidad específica.

### `app.js`

Es el punto de entrada de la aplicación.

Su responsabilidad principal es iniciar el programa.

La aplicación importa las funcionalidades desde el barrel file:

```javascript
import { menu } from "./index.js";

menu();
```

De esta manera, `app.js` no necesita conocer directamente la ubicación de cada módulo.

---

### `index.js`

Funciona como **barrel file**.

Su función es centralizar las exportaciones de los módulos:

```javascript
export * from "./modulos/menu.js";
export * from "./modulos/peticion1.js";
export * from "./modulos/peticion2.js";
export * from "./modulos/peticion3.js";
export * from "./modulos/peticion4.js";
export * from "./modulos/peticion5.js";
```

Esto permite que `app.js` trabaje con un único punto de importación.

---

### `menu.js`

Controla la interacción con el usuario desde la terminal.

Aquí se encuentra la instancia de `readline`, encargada de recibir las opciones ingresadas por teclado.

El menú permite seleccionar:

```text
1. Listar tareas pendientes
2. Buscar usuario y listar álbumes
3. Filtrar posts y agregar comentarios
4. Listar nombre y teléfono de usuarios
5. Consulta completa
0. Salir
```

Además, el menú se encarga de enviar los datos ingresados por el usuario a las funciones que los necesitan.

---

### `peticion1.js`

Contiene la lógica correspondiente a la primera petición.

Su responsabilidad es consultar y mostrar las tareas pendientes por usuario.

---

### `peticion2.js`

Contiene la lógica de búsqueda de usuarios mediante `username`, junto con sus álbumes y fotografías.

---

### `peticion3.js`

Contiene la lógica para buscar un usuario por nombre, consultar sus posts y obtener los comentarios de cada publicación.

---

### `peticion4.js`

Contiene la lógica para transformar la información de los usuarios y obtener únicamente nombre y teléfono.

---

### `peticion5.js`

Contiene la lógica para construir la consulta completa:

```text
Usuario
 ├── Posts
 │    └── Comentarios
 │
 └── Álbumes
      └── Fotografías
```

---

# ⚡ Programación asíncrona

Uno de los conceptos principales aplicados en este proyecto es la **asincronía en JavaScript**.

Las consultas a una API necesitan tiempo para obtener una respuesta. Por esta razón, se utilizan funciones asíncronas.

Ejemplo:

```javascript
async function peticion4() {
```

La palabra `async` permite trabajar con operaciones asíncronas utilizando `await`.

Ejemplo:

```javascript
const respuesta = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);
```

El `await` permite esperar la respuesta de la petición antes de continuar con la siguiente instrucción dentro de la función.

---

# Flujo de una petición

De forma general, las peticiones siguen este proceso:

```text
Usuario
   ↓
Menú
   ↓
Función correspondiente
   ↓
fetch()
   ↓
API JSONPlaceholder
   ↓
Respuesta HTTP
   ↓
.json()
   ↓
Datos JavaScript
   ↓
Procesamiento
   ↓
Resultado en terminal
```

---

# 🔗 Uso de Fetch

Para realizar las consultas se utiliza `fetch()`.

Ejemplo:

```javascript
const respuesta = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);
```

Después de recibir la respuesta, se convierte el contenido JSON en datos que JavaScript puede utilizar:

```javascript
const usuarios = await respuesta.json();
```

De esta manera:

```text
fetch()
   ↓
Respuesta HTTP
   ↓
response.json()
   ↓
Objeto / arreglo JavaScript
```

---

# Manejo de errores

Las funciones que realizan peticiones utilizan `try...catch`.

Ejemplo:

```javascript
try {

    const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

} catch (error) {

    console.log("Ocurrió un error al consultar la API.");
    console.log(error.message);
}
```

El objetivo es evitar que un error durante una operación asíncrona termine el programa sin proporcionar información al usuario.

Cuando ocurre un error, se muestra un mensaje en la terminal.

---

# Procesamiento de datos

Durante el desarrollo se utilizaron diferentes herramientas de JavaScript para trabajar con la información obtenida.

## `find()`

Se utiliza para localizar un elemento específico dentro de un arreglo.

Ejemplo:

```javascript
const usuario = usuarios.find(
    usuario => usuario.username.toLowerCase() === username.toLowerCase()
);
```

---

## `filter()`

Se utiliza para obtener solamente los elementos que cumplen una condición.

Ejemplo:

```javascript
const tareasPendientes = tareas.filter(
    tarea => tarea.userId === usuario.id &&
             tarea.completed === false
);
```

---

## `map()`

Se utiliza para transformar un arreglo y generar uno nuevo.

Ejemplo:

```javascript
const usuariosModificados = usuarios.map(usuario => ({
    nombre: usuario.name,
    telefono: usuario.phone
}));
```

---

## `for...of`

Se utiliza para recorrer los arreglos de forma sencilla.

Ejemplo:

```javascript
for (const usuario of usuarios) {
    console.log(usuario.name);
}
```

---

# Entrada de datos

La aplicación utiliza el módulo `readline` de Node.js para recibir información desde la terminal.

La entrada de teclado se centraliza en `menu.js`.

Esto evita crear diferentes instancias de `readline` en cada petición y permite mantener un flujo organizado.

Las peticiones que necesitan información del usuario reciben esos datos mediante parámetros.

Por ejemplo:

```javascript
peticion2(username);
```

De esta manera, `peticion2()` no necesita crear nuevamente una entrada de teclado.

---

# Modularización

El proyecto utiliza **ES Modules**.

Cada funcionalidad se encuentra separada en un archivo.

Ejemplo:

```javascript
export { peticion4 };
```

Y posteriormente puede ser exportada mediante el barrel file:

```javascript
export * from "./modulos/peticion4.js";
```

Finalmente, `app.js` puede acceder a ella desde:

```javascript
import { menu } from "./index.js";
```

Esta estructura permite mantener una separación clara entre las diferentes partes de la aplicación.

---

# Documentación del proyecto

La documentación detallada del desarrollo se encuentra dentro de la carpeta `docs/`.

| Documento | Contenido |
|---|---|
| `01_inicializacion_y_estructura.md` | Inicialización, estructura y configuración |
| `02_peticion1.md` | Tareas pendientes por usuario |
| `03_peticion2.md` | Usuario, álbumes y fotografías |
| `04_peticion3.md` | Posts y comentarios |
| `05_peticion4.md` | Transformación de usuarios |
| `06_peticion5.md` | Consulta completa |

La documentación fue organizada progresivamente para registrar el proceso de desarrollo de cada funcionalidad.

**[Ver documentación](./docs/)**

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

## 2. Entrar al proyecto

```bash
cd nombre-del-proyecto
```

## 3. Instalar dependencias

Si el proyecto utiliza dependencias:

```bash
npm install
```

## 4. Ejecutar la aplicación

```bash
node app.js
```

---

# Ejecución

Al iniciar la aplicación aparecerá un menú similar a:

```text
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

El usuario puede seleccionar la funcionalidad que desea ejecutar.

Al finalizar una consulta, el menú vuelve a estar disponible para realizar otra operación.

---

# Ejemplo de uso

### Buscar un usuario

```text
Seleccione una opción: 2

Ingrese el username del usuario: Bret
```

La aplicación consulta la API, encuentra el usuario correspondiente y posteriormente muestra sus datos, álbumes y fotografías.

---

# Conceptos aplicados

Durante el desarrollo del proyecto se aplicaron diferentes conceptos de programación:

### JavaScript

- Variables
- Constantes
- Funciones
- Parámetros
- Condicionales
- Ciclos
- Arreglos
- Objetos
- `find()`
- `filter()`
- `map()`
- Template literals
- Desestructuración conceptual de objetos y datos
- Funciones flecha
- ES Modules

### Asincronía

- Operaciones síncronas y asíncronas
- Event Loop
- Callbacks
- Promises
- `async`
- `await`
- Manejo de errores

### APIs

- Peticiones HTTP
- `fetch()`
- Respuestas JSON
- Recursos REST
- Rutas relacionadas
- Parámetros dinámicos

### Organización

- Modularización
- Separación de responsabilidades
- Barrel file
- Punto de entrada
- Menú interactivo
- Documentación técnica

---

# Aprendizajes

El desarrollo de este proyecto permitió practicar el consumo de APIs desde JavaScript y comprender cómo se procesa información proveniente de servicios externos.

Uno de los principales aprendizajes fue entender que una petición a una API es una operación asíncrona y que JavaScript puede continuar trabajando mientras espera una respuesta.

También se reforzó el uso de:

```text
async / await
      ↓
fetch()
      ↓
JSON
      ↓
Arreglos y objetos
      ↓
Procesamiento de información
```

Además, la separación de cada funcionalidad en módulos permitió comprender mejor cómo organizar un proyecto de JavaScript de una forma más estructurada.

---

# Buenas prácticas aplicadas

Durante el desarrollo se tuvieron en cuenta diferentes prácticas:

- Separación de funcionalidades.
- Nombres descriptivos para variables y funciones.
- Uso de módulos independientes.
- Uso de un barrel file.
- Manejo de errores.
- Validación de resultados antes de procesarlos.
- Evitar duplicar la lógica de entrada de teclado.
- Uso de comentarios para explicar decisiones importantes.
- Organización progresiva de la documentación.
- Uso de Git para el control de versiones.

---

# Control de versiones

El proyecto utiliza **Git y GitHub** para registrar los cambios realizados durante el desarrollo.

La estructura de trabajo contempla ramas para separar funcionalidades y mantener organizada la evolución del proyecto.

Ejemplo:

```text
main
 │
 └── develop
       │
       ├── feature/menu_interactivo
       ├── feature/peticion1
       ├── feature/peticion2
       ├── feature/peticion3
       ├── feature/peticion4
       └── feature/peticion5
```

Los cambios pueden integrarse posteriormente mediante commits y ramas de funcionalidad.

```

---

# Requerimientos

Para ejecutar el proyecto se necesita:

- Node.js instalado.
- Git instalado, si se desea trabajar con el repositorio.
- Conexión a Internet para consultar JSONPlaceholder.
- Una terminal.

---

# Consideraciones

JSONPlaceholder es una API utilizada principalmente para pruebas y aprendizaje.

Los datos utilizados por la aplicación provienen de los recursos públicos disponibles en la API.

La aplicación no utiliza una base de datos propia; la información se obtiene directamente mediante peticiones HTTP.

---

# Contexto académico

**Programa de Formación:** Técnico en Programación de Software  
**Entidad:** SENA  
**Proyecto:** Consumo de API REST con JavaScript  
**Tecnología principal:** JavaScript / Node.js  
**API:** JSONPlaceholder  

Este proyecto fue desarrollado como ejercicio práctico para demostrar el manejo de programación fundamental, asincronía, consumo de APIs, modularización y procesamiento de información.

---

# Resumen de la arquitectura

```text
                    ┌───────────────┐
                    │    app.js     │
                    └───────┬───────┘
                            │
                            ↓
                    ┌───────────────┐
                    │   index.js    │
                    │  Barrel File  │
                    └───────┬───────┘
                            │
                            ↓
                    ┌───────────────┐
                    │    menu.js    │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
        peticion1      peticion2      peticion3
              │             │             │
              ├─────────────┼─────────────┤
              ↓             ↓             ↓
        peticion4      peticion5       JSONPlaceholder
```

---

# Resultado final

El proyecto permite interactuar con diferentes recursos de JSONPlaceholder desde una aplicación de terminal, utilizando una arquitectura modular y programación asíncrona.

Las cinco funcionalidades desarrolladas permiten trabajar con relaciones entre:

```text
Usuarios
   │
   ├── Tareas
   │
   ├── Posts
   │     └── Comentarios
   │
   └── Álbumes
         └── Fotografías
```

La estructura del proyecto busca mantener el código separado, organizado y fácil de comprender, mientras que la documentación de `docs/` registra de manera progresiva el desarrollo de cada funcionalidad.

---

## Documentación completa

Para conocer el desarrollo paso a paso del proyecto, consultar:

**[Carpeta de documentación](./docs/)**

---

<div align="center">

### Proyecto desarrollado con JavaScript + Node.js

**SENA — Formación en Programación de Software**

</div>