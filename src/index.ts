// Archivo principal para arrancar el servidor

// const express = require('express');  // Sintaxis CommonJS
//import express from 'express'; // Sintaxis ES Modules

// Dependencia para colores en la consola
import colors from 'colors';
import server from './server';

// cuando se despliega en un servidor real, muchas veces el puerto lo asigna el mismo servidor
// process.env.PORT nos da el puerto asignado por el servidor
const port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log(colors.bgWhite.green.bold('Server running on port: '), port);
});
