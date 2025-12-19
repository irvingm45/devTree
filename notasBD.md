# Conceptos extras para mongoose
---
Cuando nosotros queremos guardar datos en nuestra base de datos, es necesario diseñar un esquema o modelo para definir la estructura de los datos, por ejemplo, si queremos guardar la venta de un coche, una estructura posible podría ser el guardar el modelo, comprador, vendedor, precio, fecha de venta, etc.

```
{
    model: String,
    buyer: String,
    seller: String,
    price: Number,
    saleDate: Date
}
```
Un modelo en mongoose con los datos del ejemplos anterior, se vería de la siguiente manera:

```typescript
import mongoose from 'mongoose';

const autoEsquema = new mongoose.Schema({
    model: {
        type: String,
        // Esto se le llama validación de esquema,
        // Esto indica que "model" es obligatorio
        required: true
    },
    buyer: {
        type: String,4
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        required: true
    }
})
```
Este esquema es muy importante cuando estamos trabajando con mongoDB porque después de crearlo, debemos ahora crear un modelo que nos permita interactuar con la base de datos, es decir, crear, leer, actualizar y eliminar documentos en una colección específica.
El modelo lo podemos crear de la siguiente manera:

```typescript  
const Auto = new mongoose.model('Auto', autoEsquema);
```
Aquí, 'Auto' es el nombre de la colección en la base de datos donde se almacenarán los documentos que sigan el esquema definido en `autoEsquema`. Ahora, podemos usar el modelo `Auto` para realizar operaciones CRUD en la colección de autos.

# Interfaces para mongoose
---
Cuando trabajamos con mongoose en TypeScript y creamos modelos, podemos usar interfaces a traves de generics para definir la estructura de los documentos que vamos a manejar.
Por ejemplo, para el modelo de Auto que definimos anteriormente, podemos crear una interfaz que represente la estructura de un documento de auto:

```typescript
interface IAuto {
    model: string;
    buyer: string;
    seller: string;
    price: number;
    saleDate: Date;
}
```
> Practicamente hacemos un espejo del model porque solo pusimos las propiedades que ya tenía el modelo con su tipo de dato correspondiente.

Luego, al crear el modelo con mongoose, podemos usar esta interfaz como un generic para asegurarnos de que los documentos que manejamos con el modelo `Auto` cumplen con la estructura definida en la interfaz `IAuto`:
```typescript
const Auto = mongoose.model<IAuto>('Auto', autoEsquema);
```
De esta manera, TypeScript nos proporcionará verificación de tipos y autocompletado cuando trabajemos con documentos del modelo `Auto`, lo que ayuda a prevenir errores y mejorar la calidad del código.

> Todo lo anterior lo podemos hacer de igual manera con types en lugar de interfaces

# Exportar e importar modelos e interfaces
---
Cuando trabajamos con modelos e interfaces en mongoose, es una buena práctica exportarlos para poder usarlos en otras partes de nuestra aplicación.
Por ejemplo, si tenemos un archivo `Auto.ts` donde definimos el esquema, modelo e interfaz para los autos, podemos exportarlos de la siguiente manera:
```typescript
import mongoose from 'mongoose';
export interface IAuto {
    // Definición de la interfaz
}
const autoEsquema = new mongoose.Schema({
    // Definición del esquema
})
const Auto = mongoose.model<IAuto>('Auto', autoEsquema);
export default Auto;

// Para importar la interfaz
import { IAuto } from './models/Auto';
// Para importar el modelo
import Auto from './models/Auto';
```

# Request y Response con mongoose
---
Cuando recibimos una petición en nuestro servidor que involucra operaciones con mongoose, como crear o actualizar documentos, podemos usar las interfaces que definimos para tipar los objetos `req.body` y `res` en nuestros controladores o rutas.
Por ejemplo, si tenemos una ruta para crear un nuevo auto, podemos tipar `req.body` con la interfaz `IAuto` para asegurarnos de que los datos recibidos cumplen con la estructura esperada:
```typescript
import { Request, Response } from 'express';
import Auto, { IAuto } from './models/Auto';
app.post('/autos', async (req: Request<{}, {}, IAuto>, res: Response) => {
    try {
        const nuevoAuto = new Auto(req.body);
        await nuevoAuto.save();
        res.status(201).send(nuevoAuto);
    } catch (error) {
        res.status(400).send(error);
    }
});
```
En este ejemplo, `Request<{}, {}, IAuto>` indica que el cuerpo de la petición (`req.body`) debe cumplir con la interfaz `IAuto`. Esto nos ayuda a prevenir errores y mejorar la calidad del código al trabajar con datos de mongoose en nuestras rutas y controladores.
Otra sintaxis para guardar nuestro documento usando mongoose es la siguiente:
```typescript
app.post('/autos', async (req: Request<{}, {}, IAuto>, res: Response) => {
    try {
        await Auto.create(req.body);
        res.status(201).send('Auto created successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});
```
Aquí usamos el método `create` del modelo `Auto` para crear y guardar un nuevo documento en la base de datos en una sola línea.
En ambos ejemplos, se crean documentos en base al schema definido en `Auto`.

## Devolver respuestas
Cuando devolvamos respuestas, siempre es importante devolver también el status code adecuado, como lo hicimos en el ejemplo anterior con `res.status(201).send(nuevoAuto);`. Esto ayuda a los clientes de la API a entender el resultado de su petición.
Para saber más sobre los status codes, puedes revisar la siguiente [página](https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status)