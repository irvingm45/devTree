// const express = require('express');  // Sintaxis CommonJS
import express from 'express'; // Sintaxis ES Modules

const app = express();

// cuando se despliega en un servidor real, muchas veces el puerto lo asigna el mismo servidor
// process.env.PORT nos da el puerto asignado por el servidor
const port = process.env.PORT || 4000;

// Routing
app.get('/', (req, res) => {
	res.send('Hola mundo en Express con TypeScript');
});

app.get('/ecommerce', (req, res) => {
	res.send('Bienvenido a la tienda en línea');
})

app.listen(port, () => {
	console.log(`Servidor inciado en el puerto: ${port}`);
});
