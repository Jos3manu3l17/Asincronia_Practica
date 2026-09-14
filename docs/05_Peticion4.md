# Petición 4 — Consultar usuarios y modificar la respuesta

## 1. Objetivo

Consultar todos los usuarios disponibles en la API de JSONPlaceholder y transformar la información obtenida en un nuevo arreglo que contenga únicamente el nombre y el teléfono de cada usuario.

---

## 2. Requerimiento

> Consultar todos los usuarios y modificar la respuesta. El resultado de esta consulta debe ser un nuevo arreglo solo con el nombre y teléfono de cada usuario.

---

## 3. Ruta utilizada

Para obtener todos los usuarios se utiliza la siguiente ruta:

```text
https://jsonplaceholder.typicode.com/users
```

Esta consulta devuelve todos los usuarios disponibles en la API.

---

## 4. Funcionamiento

El proceso realizado es:

```text
Consultar /users
      ↓
Obtener todos los usuarios
      ↓
Recorrer el arreglo con map()
      ↓
Crear un nuevo objeto por cada usuario
      ↓
Conservar solamente name y phone
      ↓
Guardar el resultado en un nuevo arreglo
```

---

## 5. Código utilizado

```js
async function peticion4() {

    try {

        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuesta.json();

        const usuariosModificados = usuarios.map(usuario => ({
            nombre: usuario.name,
            telefono: usuario.phone
        }));

        console.log("\n========================================");
        console.log("       NOMBRE Y TELÉFONO DE USUARIOS");
        console.log("========================================");

        for (const usuario of usuariosModificados) {
            console.log(`\nNombre: ${usuario.nombre}`);
            console.log(`Teléfono: ${usuario.telefono}`);
        }

    } catch (error) {

        console.log("\nOcurrió un error al consultar la API.");
        console.log(error.message);
    }
}

export { peticion4 };
```

---

## 6. Explicación del código

### Función

```js
async function peticion4() {
```

Se crea la función `peticion4`.

Se utiliza `async` porque dentro de la función se realiza una petición asíncrona a la API utilizando `await`.

La función no necesita recibir parámetros porque la petición debe consultar todos los usuarios.

---

### Manejo de errores

```js
try {
```

Se utiliza `try` para intentar ejecutar las operaciones relacionadas con la consulta y procesamiento de los datos.

---

### Consulta a la API

```js
const respuesta = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);
```

`fetch()` realiza una petición a la ruta `/users`.

`await` espera la respuesta antes de continuar.

La respuesta inicial se almacena en la variable `respuesta`.

---

### Convertir la respuesta

```js
const usuarios = await respuesta.json();
```

Se utiliza `.json()` para convertir la respuesta de la API en datos que JavaScript pueda manejar.

La variable `usuarios` contiene el arreglo original con todos los datos de los usuarios.

---

## 7. Transformación del arreglo

La parte principal de la petición es:

```js
const usuariosModificados = usuarios.map(usuario => ({
    nombre: usuario.name,
    telefono: usuario.phone
}));
```

### `usuarios.map()`

`map()` permite recorrer el arreglo `usuarios` y crear un nuevo arreglo a partir de sus elementos.

Por cada usuario se ejecuta la función:

```js
usuario => ({
```

La variable `usuario` representa el elemento que se está procesando en ese momento.

---

### Crear el nuevo objeto

Dentro de la función se crea un nuevo objeto:

```js
{
    nombre: usuario.name,
    telefono: usuario.phone
}
```

Este nuevo objeto solamente contiene las dos propiedades solicitadas.

La propiedad:

```js
nombre
```

recibe el valor de:

```js
usuario.name
```

Mientras que:

```js
telefono
```

recibe el valor de:

```js
usuario.phone
```

---

## 8. Ejemplo de transformación

La API puede entregar un usuario con diferentes datos:

```js
{
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org"
}
```

Después de utilizar `map()`, ese usuario se transforma en:

```js
{
    nombre: "Leanne Graham",
    telefono: "1-770-736-8031"
}
```

El proceso se realiza con todos los usuarios.

Por lo tanto, se genera un nuevo arreglo como:

```js
[
    {
        nombre: "Leanne Graham",
        telefono: "1-770-736-8031"
    },
    {
        nombre: "Ervin Howell",
        telefono: "010-692-6593"
    }
]
```

El arreglo original `usuarios` no se modifica.

---

## 9. Recorrer el nuevo arreglo

```js
for (const usuario of usuariosModificados) {
```

Se utiliza `for...of` para recorrer el nuevo arreglo y acceder a cada usuario transformado.

---

### Mostrar el nombre

```js
console.log(`\nNombre: ${usuario.nombre}`);
```

Muestra el nombre almacenado en la propiedad `nombre`.

---

### Mostrar el teléfono

```js
console.log(`Teléfono: ${usuario.telefono}`);
```

Muestra el teléfono almacenado en la propiedad `telefono`.

---

## 10. Manejo de errores

```js
} catch (error) {
```

Si ocurre algún error durante la consulta o procesamiento, el programa pasa al bloque `catch`.

```js
console.log("\nOcurrió un error al consultar la API.");
console.log(error.message);
```

Se muestra un mensaje entendible y posteriormente el mensaje específico del error.

---

## 11. Exportación

```js
export { peticion4 };
```

Permite exportar la función para que pueda ser utilizada desde otro módulo del proyecto.

En `menu.js` se importa mediante:

```js
import { peticion4 } from "./peticion4.js";
```

Y la opción 4 del menú ejecuta:

```js
case "4":
    await peticion4();
    break;
```

---

## 12. Conceptos aplicados

En esta petición se aplicaron:

- Funciones.
- `async/await`.
- `fetch`.
- Consumo de una API REST.
- Arrays.
- Objetos.
- `map()`.
- `for...of`.
- Template literals.
- Manejo de errores con `try...catch`.
- Módulos ES.
- `import` y `export`.
- Transformación de datos.

---

## 13. Decisión técnica

Se utilizó `map()` porque el requerimiento solicita generar un **nuevo arreglo** con una estructura diferente a la respuesta original.

En lugar de conservar todos los datos de cada usuario, se seleccionaron únicamente:

```text
name → nombre
phone → telefono
```

Esto permite cumplir directamente con el requerimiento sin modificar el arreglo original obtenido de la API.

---

## 14. Resultado esperado

Al ejecutar la opción 4 se muestra una salida similar a:

```text
========================================
       NOMBRE Y TELÉFONO DE USUARIOS
========================================

Nombre: Leanne Graham
Teléfono: 1-770-736-8031

Nombre: Ervin Howell
Teléfono: 010-692-6593

Nombre: Clementine Bauch
Teléfono: 1-463-123-4447
```

---

## 15. Conclusión

La Petición 4 permite consultar todos los usuarios de JSONPlaceholder y transformar la respuesta en un nuevo arreglo que contiene únicamente el nombre y el teléfono.

El concepto principal aplicado es `map()`, utilizado para recorrer el arreglo original y crear una nueva estructura de datos sin modificar la información original.