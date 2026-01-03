# Glosario de Términos

---

## Conceptos Fundamentales de HTTP

- **Body (cuerpo)**: Parte de la petición HTTP que contiene el payload (JSON, form data, archivos). Su formato lo indica `Content-Type`.
- **Cacheable**: Indica si las respuestas pueden guardarse en caché (GET suele ser cacheable).
- **Content-Type**: Cabecera que indica el formato del body (ej.: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`).
- **GET**: Método para leer/recuperar recursos. Los datos viajan por la URL (query/path) y la respuesta puede cachearse.
- **Headers**: Metadatos en la petición/respuesta (ej.: `Content-Type`, `Authorization`).
- **HTTP method / Verb**: Tipo de petición HTTP (GET, POST, PUT, PATCH, DELETE, etc.) que indica la intención de la petición.
- **HTTPS**: HTTP sobre TLS — cifrado necesario para proteger datos en tránsito.
- **Idempotente**: Operación que puede repetirse sin causar efectos secundarios adicionales (GET y PUT suelen ser idempotentes; POST no lo es por defecto).
- **JSON**: Formato de datos muy usado en APIs (JavaScript Object Notation).
- **Path params / URL params**: Parámetros incluidos en la ruta, por ejemplo `/users/:id` (`req.params.id`).
- **Payload**: Datos enviados en la petición HTTP (body, query params, path params).
- **POST**: Método para enviar datos al servidor (crear o procesar). Los datos viajan en el *body* de la petición.
- **Query string**: Parte de la URL con parámetros en formato `?k=v&k2=v2` (ej.: `?id=123`).
- **Status codes**: Códigos numéricos de respuesta HTTP (200, 201, 400, 401, 403, 404, 500, ...).

## Express.js y Node.js

- **express.json()**: Middleware que parsea JSON en el body y lo coloca en `req.body`.
- **express.urlencoded()**: Middleware para parsear `application/x-www-form-urlencoded`.
- **handle**: Función que procesa una petición HTTP en Express (también llamada "controller" o "route handler").
- **Middleware**: Función intermedia en Express que procesa `req`/`res` antes del handler (ej.: `express.json()`).
- **NextFunction / next**: Función para pasar control al siguiente middleware o handler en Express.
- **process.env**: Objeto de Node.js que contiene variables de entorno (ej.: `process.env.PORT`). Se usan para configurar la app sin cambiar código.
- **req / res**: Objetos comunes en Express que representan la petición y la respuesta.
- **Router**: Módulo de Express para agrupar rutas (`const router = Router()`).
- **server.listen(port)**: Método que inicia el servidor y lo hace escuchar en el puerto dado.

## Desarrollo y Herramientas

- **CommonJS vs ESM**: Dos sistemas de módulos en Node.js; CommonJS usa `require()`/`module.exports`, ESM usa `import`/`export`.
- **dependencies**: Dependencias necesarias en producción (ej.: `express`).
- **devDependencies**: Dependencias necesarias solo en desarrollo (ej.: `nodemon`, `ts-node`).
- **DOM**: Document Object Model; estructura de objetos que representa la página web en el navegador. No se altera directamente por POST; es manipulado por JS en el cliente.
- **dotenv / .env**: Paquete y archivo para cargar variables de entorno en desarrollo (`require('dotenv').config()`).
- **Logger (console / morgan / winston)**: Registro de eventos; `console.log` es simple, `morgan`/`winston` se usan en producción.
- **nodemon**: Herramienta de desarrollo que reinicia el servidor cuando detecta cambios en archivos.
- **pre/post hooks (npm)**: Si defines `pre<name>` o `post<name>` npm ejecuta esos scripts antes/después del script `<name>`.
- **scripts**: Comandos definidos en `package.json` que se ejecutan con `npm run <name>`.
- **start / build / dev**: Convenciones de scripts (`start` para producción, `build` para compilar, `dev` para desarrollo con hot-reload).
- **ts-node**: Ejecuta TypeScript directamente sin compilar a archivos .js (útil en desarrollo).
- **tsc**: Compilador de TypeScript (convierte .ts a .js en `outDir`).

## Bases de Datos

- **colección (collection)**: Conjunto de documentos en una base de datos NoSQL como MongoDB (similar a una tabla en bases de datos relacionales).
- **esquema (schema)**: Definición de la estructura y reglas de un modelo de datos en una base de datos (ej.: Mongoose schema).
- **modelo (model)**: Representación de una colección o tabla en la base de datos, basada en un esquema (ej.: Mongoose model).
- **Mongoose**: ODM popular para MongoDB en Node.js; define esquemas y modelos para documentos. Lo usamos en este proyecto para gestionar la base de datos.
- **ODM**: Object-Document Mapping; similar al ORM pero para bases de datos NoSQL (ej.: Mongoose para MongoDB).
- **ORM**: Object-Relational Mapping; herramienta para interactuar con bases de datos usando objetos (ej.: Sequelize, TypeORM).

## Seguridad y Autenticación

- **Authentication / Login**: Flujo de verificación de identidad; suele implementarse en rutas `POST /auth/login` y devolver tokens o cookies.
- **CORS**: Cross-Origin Resource Sharing — política que controla qué orígenes pueden hacer peticiones a tu API.
- **CSRF (Cross-Site Request Forgery)**: Vulnerabilidad que hace que un navegador autorizado ejecute acciones no deseadas; usualmente requiere protección en endpoints que usan cookies de sesión.
- **Error handling middleware**: Middleware con firma `(err, req, res, next)` para manejar errores centralizados.
- **Input validation / validación de datos**: Proceso de verificar que los datos entrantes cumplen con ciertos criterios antes de ser procesados (ej.: tipos, formatos, rangos).

## Conceptos Generales de APIs

- **CRUD**: Create, Read, Update, Delete — operaciones básicas sobre recursos.
- **REST**: Estilo de arquitectura para diseñar APIs HTTP usando métodos semánticos (GET/POST/PUT/DELETE).

## JavaScript/TypeScript

- **await**: Palabra clave en JavaScript/TypeScript para esperar la resolución de una promesa de manera asíncrona dentro de funciones `async`.
- **async**: Palabra clave que define una función asíncrona que puede usar `await` para manejar promesas.
- **Promise**: Objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.
- **TypeScript**: Superset de JavaScript que añade tipado estático y otras características para mejorar la calidad del código.
- **type/interface**: En TypeScript, `type` e `interface` se usan para definir tipos personalizados y estructuras de datos en tiempo de compilación.
- **void**: Tipo en TypeScript que indica que una función no retorna ningún valor.
- **unknown**: Tipo en TypeScript que representa un valor cuyo tipo no se conoce en tiempo de compilación; más seguro que `any`.
- **any**: Tipo en TypeScript que desactiva la verificación de tipos; permite asignar cualquier valor, pero puede llevar a errores en tiempo de ejecución.