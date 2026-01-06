# Apuntes de Frontend con React, TypeScript y Vite

Este documento detalla el progreso y los conceptos fundamentales del frontend del proyecto. Está diseñado para alguien que se inicia en React, explicando "desde cero" cómo funciona la estructura actual.

## 1. El Entorno de Desarrollo: Vite + React + TypeScript
---
En este proyecto no estamos usando HTML/JS "puro" directamente. Usamos un conjunto de herramientas modernas:

-   **React**: Una biblioteca de JavaScript para construir interfaces de usuario (UI) basadas en componentes.
-   **TypeScript (TS)**: Como vimos en el backend, añade tipos a JavaScript para evitar errores. En React, los archivos tienen la extensión `.tsx` (TypeScript + JSX).
-   **Vite**: Es la herramienta que "empaqueta" y sirve nuestra aplicación. Es mucho más rápido que herramientas antiguas (como Webpack). Se encarga de traducir nuestro código TS/React a algo que el navegador entienda instantáneamente durante el desarrollo.

## 2. Estructura de Carpetas Clave
---
Dentro de la carpeta `frontend/`:

-   **`node_modules/`**: Aquí viven las librerías que instalamos (como `react`, `react-router-dom`, etc.). Nunca se toca manualmente.
-   **`public/`**: Archivos estáticos que no cambian (imágenes, iconos) y que queremos servir tal cual.
-   **`src/`**: **Aquí ocurre la magia**. Contiene todo el código fuente de la aplicación.
-   **`index.html`**: Es la única página HTML "real" de la aplicación. React "inyectará" todo el contenido dentro de un `div` vacío que vive aquí: `<div id="root"></div>`.
-   **`package.json`**: Lista las dependencias y scripts del frontend (ej. `npm run dev` para iniciar el servidor de desarrollo).
-   **`tailwind.config.js`**: Archivo de configuración para Tailwind CSS (nuestro framework de estilos).

## 3. El Punto de Entrada: `src/main.tsx`
---
Este es el primer archivo que se ejecuta. Su función principal es tomar nuestra aplicación de React y "pintarla" (renderizarla) dentro del HTML.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
```

**Desglose:**
1.  **`createRoot`**: React moderno usa esto para tomar el control del elemento con id `'root'` (que está en `index.html`).
2.  **`<StrictMode>`**: Es una herramienta de desarrollo que nos avisa de problemas potenciales en el código. No afecta a la aplicación final.
3.  **`<Router />`**: Aquí estamos importando y mostrando nuestro componente principal de rutas. En lugar de pintar un texto fijo, pintamos "el manejador de rutas".
4.  **`import './index.css'`**: Importa los estilos globales (donde se incluye Tailwind).

## 4. Enrutamiento: `src/router.tsx`
---
En una Single Page Application (SPA) como esta, no recargamos la página al cambiar de URL. React simula el cambio de página intercambiando componentes. Para esto usamos `react-router-dom`.

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
            </Routes>        
        </BrowserRouter>
    )
}
```

**Conceptos clave:**
-   **`BrowserRouter`**: Envuelve la aplicación para habilitar la navegación sin recargas.
-   **`Routes`**: Actúa como un "switch". Busca qué `Route` coincide con la URL actual del navegador.
-   **`Route`**: Define una regla: "Cuando la URL sea X, muestra el componente Y".
    -   `path='/auth/login'`: La URL en el navegador.
    -   `element={<LoginView />}`: El componente visual que se mostrará.

> **Nota**: Actualmente las rutas están anidadas dentro de un `Route` padre sin `path`. Esto es común para agrupar rutas que comparten un diseño (layout) en el futuro, aunque por ahora solo sirve de contenedor.

## 5. Vistas (Views): Componentes Funcionales
---
Los componentes en React son simplemente **funciones** que devuelven lo que parece HTML (pero es JSX). Hemos creado dos vistas básicas en `src/views/`:

**`LoginView.tsx`**
```tsx
export default function LoginView() {
    return (
        <div>LoginView</div>
    )
}
```

**`RegisterView.tsx`**
```tsx
export default function RegisterView() {
    return (
        <div>RegisterView</div>
    )
}
```

**¿Qué es JSX?**
Es esa sintaxis parecida a HTML dentro de JavaScript.
-   En lugar de `class`, usamos `className` (porque `class` es una palabra reservada en JS).
-   Podemos meter lógica de JS dentro usando llaves `{}`.

## 6. Estilos: Tailwind CSS
---
El proyecto está configurado con **Tailwind CSS**. Esto significa que no escribiremos archivos `.css` largos y separados. En su lugar, usaremos clases predefinidas directamente en los elementos HTML/JSX.

Ejemplo (cómo se vería un botón):
```tsx
<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Botón
</button>
```

-   `bg-blue-500`: Fondo azul.
-   `text-white`: Texto blanco.
-   `rounded`: Bordes redondeados.

La configuración está en `tailwind.config.js` y las directivas base se importan en `src/index.css`.

## Resumen del Flujo
1.  El navegador carga `index.html`.
2.  `index.html` ejecuta `main.tsx`.
3.  `main.tsx` renderiza el componente `Router`.
4.  `Router` mira la URL actual (ej. `/auth/login`).
5.  Si coincide, renderiza `LoginView`.
6.  `LoginView` devuelve el JSX (HTML) que el usuario ve.
