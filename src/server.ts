// Archivo para configurar el servidor y las rutas
import express from 'express';
const app = express();

//Routing
app.get('/', (req, res) => {
    res.send('Hola mundo en Express con TypeScript');
});

export default app