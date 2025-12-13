// Archivo para configurar el servidor y las rutas
import express from 'express';
// Importamos el router
import router from './router';
const app = express();

// Leer datos de formularios
app.use(express.json());

// use nos permite usar middlewares
// Middleware es una función que se ejecuta antes de llegar a las rutas
app.use('/', router);

export default app