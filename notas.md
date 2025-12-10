# Notas sobre Desarrollo con Node.js y TypeScript

Este documento resume conceptos clave para trabajar con Node.js, incluyendo la gestión de paquetes con `npm`, el uso de dependencias y la configuración de un entorno de desarrollo con TypeScript.

## Estructura del `package.json`

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
