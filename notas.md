# Notas sobre Desarrollo con Node.js y TypeScript

Este documento resume conceptos clave para trabajar con Node.js, incluyendo la gestión de paquetes con `npm`, el uso de dependencias y la configuración de un entorno de desarrollo con TypeScript.

## Estructura del `package.json`
---
El archivo `package.json` es el corazón de cualquier proyecto de Node.js. Contiene metadatos sobre el proyecto y gestiona las dependencias y los scripts.

-   **`name`**: El nombre de tu proyecto.
-   **`version`**: La versión actual de tu proyecto.
-   **`description`**: Una breve descripción de lo que hace tu proyecto.
-   **`main`**: El punto de entrada principal de la aplicación. Node.js utiliza este campo para saber qué archivo ejecutar cuando se inicia la aplicación.
    ```json
    "main": "src/index.js"
    ```
-   **`scripts`**: Define comandos que se pueden ejecutar con `npm run <nombre_del_script>`. Es útil para automatizar tareas como iniciar el servidor, compilar código o correr pruebas.
    ```json
    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.ts"
    }
    ```
    Para ejecutar el script `dev`, usarías: `npm run dev`.

-   **`author`**: El autor del proyecto.
-   **`license`**: La licencia bajo la cual se distribuye el proyecto (por ejemplo, "MIT").
-   **`dependencies`**: Paquetes de npm que son necesarios para que la aplicación funcione en producción.
-   **`devDependencies`**: Paquetes que solo se necesitan durante el desarrollo y las pruebas (por ejemplo, `nodemon`, `typescript`, `@types/node`).

## Puntos Generales de Desarrollo
---
# Notas sobre Desarrollo con Node.js y TypeScript

Este documento resume conceptos clave para trabajar con Node.js, incluyendo la gestión de paquetes con `npm`, el uso de dependencias y la configuración de un entorno de desarrollo con TypeScript.

## Estructura del `package.json`
---
El archivo `package.json` es el corazón de cualquier proyecto de Node.js. Contiene metadatos sobre el proyecto y gestiona las dependencias y los scripts.

-   **`name`**: El nombre de tu proyecto.
-   **`version`**: La versión actual de tu proyecto.
-   **`description`**: Una breve descripción de lo que hace tu proyecto.
-   **`main`**: El punto de entrada principal de la aplicación. Node.js utiliza este campo para saber qué archivo ejecutar cuando se inicia la aplicación.
    ```json
    "main": "src/index.js"
    ```
-   **`scripts`**: Define comandos que se pueden ejecutar con `npm run <nombre_del_script>`. Es útil para automatizar tareas como iniciar el servidor, compilar código o correr pruebas.
    ```json
    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.ts"
    }
    ```
    Para ejecutar el script `dev`, usarías: `npm run dev`.

-   **`author`**: El autor del proyecto.
-   **`license`**: La licencia bajo la cual se distribuye el proyecto (por ejemplo, "MIT").
-   **`dependencies`**: Paquetes de npm que son necesarios para que la aplicación funcione en producción.
-   **`devDependencies`**: Paquetes que solo se necesitan durante el desarrollo y las pruebas (por ejemplo, `nodemon`, `typescript`, `@types/node`).

## Puntos Generales de Desarrollo
---
### Dependencias de Desarrollo vs. Producción

En un proyecto de Node.js, existen dos tipos principales de dependencias:

-   **Dependencias de producción (`dependencies`)**: Son esenciales para que la aplicación se ejecute una vez desplegada. Se instalan en el entorno de producción.
-   **Dependencias de desarrollo (`devDependencies`)**: Son herramientas exclusivas para la fase de desarrollo, como compiladores, linters o herramientas de testing. No se instalan en el entorno de producción para mantener el paquete final lo más ligero posible.

Para instalar una dependencia de desarrollo, puedes usar los siguientes comandos:

```bash
# Opción 1 (con el flag --save-dev)
npm install --save-dev <nombre_del_paquete>

# Opción 2 (con el atajo -D)
npm install -D <nombre_del_paquete>
```

### Gestión de Procesos y Puertos

-   **Liberar un puerto**: Si un proceso está bloqueando un puerto y necesitas detenerlo, puedes usar `npx kill-port`:
    ```bash
    npx kill-port <numero_del_puerto>
    ```
-   **Modo "Watch" con Nodemon**: Durante el desarrollo, es tedioso tener que reiniciar manualmente el servidor con cada cambio en el código. `nodemon` es una herramienta que automatiza este proceso, reiniciando la aplicación cada vez que detecta un cambio en los archivos. Se configura típicamente en los `scripts` del `package.json`.

## TypeScript en Proyectos de Node.js
---

**TypeScript (TS)** es un superconjunto de JavaScript (JS) que añade tipado estático opcional. Esto significa que cualquier código JavaScript válido también es código TypeScript válido. La principal ventaja de TS es que permite definir tipos para variables, parámetros de funciones y valores de retorno, lo que ayuda a detectar errores en tiempo de compilación en lugar de en ejecución.

Dado que los servidores y navegadores no ejecutan TypeScript de forma nativa, el código TS siempre se **compila** a JavaScript antes de ser desplegado. Por esta razón, TypeScript es considerado una dependencia de desarrollo (`devDependency`).

### Configuración con `tsconfig.json`

Para usar TypeScript en un proyecto (por ejemplo, con Express), se necesita un archivo `tsconfig.json`. Este archivo especifica las opciones del compilador de TypeScript.

```json
// Ejemplo de un archivo tsconfig.json básico
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"] // Asegúrate de incluir los archivos que quieres compilar
}
```

#### Opciones Clave del Compilador:

-   **`target`**: Especifica la versión de ECMAScript a la que se compilará el código (ej. "ES6", "ES2020").
-   **`module`**: Define el sistema de módulos a utilizar en el código compilado (ej. "commonjs" para Node.js).
-   **`outDir`**: El directorio donde se guardarán los archivos JavaScript compilados (ej. `./dist`).
-   **`rootDir`**: El directorio raíz que contiene los archivos fuente de TypeScript (ej. `./src`).
-   **`strict`**: Habilita un conjunto de verificaciones de tipo estrictas para un código más robusto.
-   **`esModuleInterop`**: Mejora la compatibilidad entre los módulos CommonJS y los módulos ES6.
-   **`sourceMap`**: Genera archivos `.map` que permiten depurar el código TypeScript original en lugar del JavaScript compilado.
-   **`declaration`**: Genera archivos de declaración de tipos (`.d.ts`) junto con el JavaScript. Esto es útil si estás creando una librería.
-   **`moduleResolution`**: Define cómo el compilador busca los módulos. `"node"` es la estrategia más común para proyectos de Node.js.

 Para hacer funcionar dicho archivo, se necesita especificar como script el `tsc` el cual nos sirve para compilar el proyecto con TypeScript. Normalmente se especifica en el comando `build`
___
 `build` no es un comando reservado de npm, pero es una convención ampliamente adoptada en la comunidad de desarrollo para indicar que el script se encarga de compilar o construir el proyecto.
___

### Scripts en `package.json`

Para compilar el proyecto TypeScript, como se ya se había dicho antes, se puedede agregar un script en el `package.json`:

```json
"scripts": {
  "build": "tsc"
}
```
Para correr el proyecto podemos hacerlo de dos formas:
* Ejecutarlo como desarrollo con `ts-node` y `nodemon`:
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts"
}
```
* Ejecutarlo en producción compilando primero y luego corriendo el JavaScript resultante:
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```
En pocas palabras, con `npm run dev` ejecutamos el proyecto en modo desarrollo, y con `npm start` ejecutamos el proyecto en modo producción pero habiendolo compilador previamente. 

## Configuración de Rutas en Express con TypeScript
---

Un router es un módulo que permite organizar las rutas de una aplicación en diferentes archivos o módulos. Esto es especialmente útil en aplicaciones grandes donde tener todas las rutas en un solo archivo puede volverse inmanejable.

Básicamente, el router ayuda a enlistar las rutas y sus controladores asociados que manejan las solicitudes HTTP (GET, POST, PUT, DELETE, etc.) para esas rutas específicas.

La sintaxis básica para crear un router en Express con TypeScript es la siguiente:

```typescript
import { Router, Request, Response } from 'express';
const router = Router();
// Definir rutas
router.get('/', (req: Request, res: Response) => {
    res.send('Hola desde el router!');
});
export default router;
```
Lo que hicimos fue primero importar `Router`, `Request` y `Response` desde el paquete `express`. Luego, creamos una instancia del router usando `Router()`. Después, definimos una ruta GET para la raíz (`'/'`) que responde con un mensaje simple. Finalmente, exportamos el router para poder usarlo en otras partes de la aplicación.

La sintaxis de *export* e *import* inicia con alguna de dichas palabras, seguido de la entidad que se quiere exportar o importar con la palabra *default* si es que se quiere exportar o importar como predeterminada. En caso de que no sea así, se usan llaves `{}` para especificar qué entidades se quieren importar o exportar.
> Con predeterminado se refiere a que solo hay una entidad que se exporta o importa del archivo.

## Integración del Router en el Servidor Principal
---
Para integrar el router en el servidor principal de Express, primero debes importarlo y luego usarlo
con el método `app.use()`. Aquí tienes un ejemplo de cómo hacerlo:

```typescript
import express from 'express';
import router from './router'; // Asegúrate de que la ruta sea correcta
const app = express();
app.use('/', router);
export default app;
```

Debemos usar el método `app.use()` para montar el router en la aplicación Express. En este caso, todas las rutas definidas en el router estarán disponibles bajo la ruta raíz (`'/'`). Si quisieras montar el router bajo una ruta específica, podrías hacerlo así:

```typescript
app.use('/api', router);
```
En este caso, todas las rutas definidas en el router estarán disponibles bajo la ruta `/api`. Por ejemplo, si el router tiene una ruta GET para `'/'`, ahora estaría accesible en `/api/`.

> El método `app.use()` recibe dos parámetros: la ruta base y el router que se va a usar para manejar las solicitudes a esa ruta.

## GET vs POST (resumen práctico)
---

- **GET**: Se usa para *leer* recursos. Los datos que acompañan a la petición suelen viajar en la URL (query string o path params). Es cacheable, bookmarkable e idempotente.
- **POST**: Se usa para *enviar datos* al servidor para crear o procesar recursos. Los datos viajan en el *body* de la petición (no en la URL). No es idempotente por defecto y no se cachea normalmente.

### ¿Qué es el "body" de la petición?

El *body* (cuerpo) es la parte de la petición HTTP donde se coloca el payload (datos). Se utiliza con métodos como `POST`, `PUT`, `PATCH`. El formato del body viene indicado por la cabecera `Content-Type` (por ejemplo `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`).

En Express se procesa habitualmente con middleware:

```ts
import express from 'express';
const app = express();
app.use(express.json()); // parsea JSON en req.body

app.post('/users', (req, res) => {
  const body = req.body; // aquí están los datos enviados en el body
  res.status(201).json({ created: true, user: body });
});
```

### Ejemplos prácticos

- GET con `curl`:

```bash
curl "http://localhost:3000/users?id=123"
```

- POST JSON con `curl`:

```bash
curl -i -X POST -H "Content-Type: application/json" \
  -d '{"name":"Irvin","email":"irvin@example.com"}' \
  http://localhost:3000/users
```

- `fetch` en el navegador (GET y POST):

```js
// GET
fetch('/users?id=123').then(r => r.json()).then(console.log);

// POST
fetch('/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Irvin' })
}).then(r => r.json()).then(console.log);
```

### Formularios HTML

Un formulario HTML tradicional puede enviar datos usando POST (body):

```html
<form action="/login" method="POST">
  <input name="username">
  <input name="password" type="password">
  <button type="submit">Enviar</button>
</form>
```

Por defecto el navegador enviará el body como `application/x-www-form-urlencoded` (o `multipart/form-data` si el formulario incluye archivos).

### Buenas prácticas y recomendaciones

- Usa `GET` para lecturas y `POST/PUT/PATCH/DELETE` para operaciones que modifiquen estado siguiendo las convenciones REST.
- No envíes datos sensibles por `GET` (quedan en la URL/historial y en logs). Usa `POST` sobre HTTPS.
- Si necesitas que una operación sea idempotente (reintentos seguros), considera `PUT` o diseña identificadores únicos para evitar duplicados.
- Configura el middleware apropiado en Express: `express.json()`, `express.urlencoded()` o `multer` para subir archivos.
- Dev/deps: recuerda que herramientas como `nodemon` deben estar en `devDependencies`.

### Códigos de estado comunes

- `200 OK` → petición exitosa (GET, POST que devuelve recurso existente).
- `201 Created` → recurso creado (respuesta típica a POST que crea algo).
- `400 Bad Request` → petición malformada.
- `401 Unauthorized` / `403 Forbidden` → problemas de autenticación/autorización.
- `404 Not Found` → recurso no encontrado.
- `500 Internal Server Error` → error en servidor.

# Peticiones HTTP con Express y TypeScript
---

Para manejar peticiones HTTP que tienen un cuerpo (body) hecho en JSON en un servidor Express con TypeScript, es necesario utilizar middleware que pueda interpretar el cuerpo de la petición y convertirlo en un objeto accesible desde `req.body`.

Este middleware es `express.json()`, que viene incluido con Express. La configuración de este middleware es bastante sencilla:

```typescript
import express, { Request, Response } from 'express';
const app = express();
// Middleware para parsear JSON en el body
app.use(express.json());
app.post('/data', (req: Request, res: Response) => {
    const data = req.body; // Aquí accedemos al cuerpo de la petición
    res.status(200).json({ received: data });
});
```
En este ejemplo todo se conjunta en un solo script pero normalmente la parte de `express.json()` se coloca en el archivo principal del servidor mientras que las rutas se definen en los archivos routing.

> Vease la parte de [router.ts](notas.md#configuración-de-rutas-en-express-con-typescript) para más detalles.


# ORM y Bases de Datos
---
Un ORM (Object-Relational Mapping) es una técnica que se utiliza donde los datos de una base de datos son trataos como Objetos, utilizando un paradigma de POO.

Esto permite que:
* El código interactúe con una base de datos.
* La velocidad de desarrollo aumente.
* Seguridad en las consultas al sanitizar los datos.

Ejemplo:
```SQL
INSERT INTO 'users' ('name') VALUES('Juan');
```
En ORM se vería así:
```typescript
Users.create({name:'Juan'});
```
Prácticamente, el ORM es código nativo de JS.

## MongoDB y Mongoose
MongoDB es una base de datos NoSQL que almacena datos en documentos JSON. MongoDB es muy flexible y escalable, lo que la hace popular para aplicaciones modernas.
Mongoose es un ODM (Object Data Modeling) para MongoDB y Node.js.
La diferencia entre ORM y ODM es que el primero se usa para bases de datos relacionales (SQL) y el segundo para bases de datos NoSQL.
En Mongoose defines esquemas y modelos para tus datos, lo que facilita la interacción con MongoDB desde tu aplicación Node.js.

## Variables de entorno
Las variables de entorno son valores que cambian según el entorno en el que se ejecuta la aplicación (desarrollo, producción, etc.). Se utilizan para configurar aspectos como puertos, URLs de bases de datos, claves secretas, entre otros.
Un ejemplo sencillo que hemos estado usando en el proyecto, es el puerto local en el que corre el servidor (4000), el cual es una variable de desarrollo.
```typescript
const port = 4000;
```
Sin embargo, en producción, el puerto puede ser diferente y no queremos cambiar el código cada vez que despleguemos la aplicación. Aquí es donde las variables de entorno son útiles. En el código de nuestro proyecto ya hemos usado `process.env.PORT` para obtener el puerto desde las variables de entorno:
```typescript
const port = process.env.PORT || 4000;
```
Una varible de entorno importante, es la URL de conexión a la base de datos (MongoDB) porque si nosotros ponemos la URL directamente en el código, estaríamos exponiendo información sensible como el usuario y la contraseña de la base de datos. En su lugar, podemos usar una variable de entorno para almacenar esta información de manera segura.

Las variables de entorno se colocan en un archivo de nombre `.env` en la raíz del proyecto, donde cada variable en el archivo, será nombrada enteramente con mayúsculas. Por ejemplo:
```MONGO_URI=mongodb+srv://usuario:contraseña```

> Node.js soporta variables de entorno con el archivo `.env` pero en cambio nodemon no lo hace, por lo que es necesario usar el paquete `dotenv` para cargar las variables de entorno desde el archivo `.env` en el entorno de desarrollo.

### Uso de `dotenv` para cargar variables de entorno
Para usar `dotenv`, primero debes instalarlo como una dependencia de desarrollo:
```bash
# En caso de que quieras instalarlo como dependencia de desarrollo
npm i dotenv
# En caso de que quieras instalarlo como dependencia de producción
npm i -D dotenv
# equivalente a...
npm i dotenv --save-dev
```

Luego, en el archivo principal de tu aplicación (por ejemplo, `src/index.ts` o `src/server.ts`), debes importar y configurar `dotenv` al inicio del archivo:
```typescript
import dotenv from 'dotenv';
// Cargar variables de entorno desde el archivo .env
dotenv.config();
```

# Hashear contraseñas
---
Hashear contraseñas es bastante importante para la seguridad de los datos de los usuarios para evitar que las contraseñas sean robadas y usadas de manera maliciosa.
Afortunadamente, existen dependencias que nos facilitan el trabajo de hashear porque de otra manera, tendríamos que hacerlo de manera manual con conocimientos de criptografía. En este proyecto, usamos la dependencia `bcrypt` para hashear contraseñas.
Para instalar `bcrypt`, puedes usar el siguiente comando:
```bash
npm install bcrypt
```
Antes de hashear una contraseña, necesitamos conocer el término *Salt* (sal). El *salt* es un valor aleatorio que se añade a la contraseña antes de hashearla. Esto hace que incluso si dos usuarios tienen la misma contraseña, sus hashes serán diferentes debido al *salt* único. Entre mas salt tenga una contraseña, más segura será pero mas lenta de generar.

Para hashear una contraseña con `bcrypt`, puedes usar el siguiente código de ejemplo:
```typescript
import bcrypt from 'bcrypt';
const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // Genera un salt con 10 rondas
    const hashedPassword = await bcrypt.hash(password, salt); // Hashea la contraseña con el salt
    return hashedPassword;
};
```
En este ejemplo, la función `hashPassword` toma una contraseña como entrada, genera un *salt* con 10 rondas de complejidad, y luego hashea la contraseña junto con el *salt*. El resultado es el hash de la contraseña que puedes almacenar de manera segura en la base de datos.

# Handler
---
Un *handler* no es mas que un nombre de usuario procesado para que no haya problema en las peticiones HTTP. Generalmente se usa en las rutas de usuarios para identificar a un usuario en específico. Por ejemplo, si un usuario se llama "Irvin López", su *handle* podría ser "irvinlopez" o "irvin_lopez", dependiendo de las reglas que se quieran aplicar. El *handle* debe ser único para cada usuario y no debe contener espacios ni caracteres especiales.
Para hacer *handlers* únicos, podemos ocupar una dependencia llamada `slugify` que nos ayuda a convertir un nombre en un *handle* válido. Para instalar `slugify`, puedes usar el siguiente comando:
```bash
npm install slugify
```
Luego, puedes usar `slugify` para generar un *handle* a partir del nombre del usuario:
```typescript
import slugify from 'slugify';
const generateHandle = (name: string): string => {
    return slugify(name, { lower: true, strict: true });
};
```
La función `generateHandle` toma un nombre como primer parámetro y como segundo parámetro, un objeto que le indica que el *handle* debe ser en minúsculas, sin espacios, sin caracteres especiales, etc. En este ejemplo se le indica que el *handle* debe ser en minúsculas y sin caracteres especiales.