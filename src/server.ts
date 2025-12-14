// Archivo para configurar el servidor y las rutas

import express from 'express';
// Importamos las variables de entorno
import 'dotenv/config';
// Importamos el router
import router from './router';
// Importamos la configuración de la base de datos
import { connectDB } from './config/db';

const app = express();
console.log("Connecting to the database...");
connectDB();

// Leer datos de formularios
app.use(express.json());

// use nos permite usar middlewares
// Middleware es una función que se ejecuta antes de llegar a las rutas
app.use('/', router);

export default app