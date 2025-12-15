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
        type: String,
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