# Tipos de datos en TS
---
## Primitive types
Son los tipos de datos que TS soporta de forma nativa como number, string, boolean, null y undefined.

```typescript
let age : number = 25;
let name : string = "Juan";
let isStudent : boolean = true;
let address : null = null;
let phoneNumber : undefined = undefined;
```
Cuando se trata de arreglos, la sintaxis cambia un poco:

```typescript
let numbers : number[] = [1, 2, 3, 4, 5];
let names : string[] = ["Ana", "Luis", "Carlos"];
let isStudentArray : boolean[] = [true, false, true];
```
De manera automática, TS infiere el tipo de dato si no se especifica explícitamente:

```typescript
let city = "Madrid"; // TS infiere que es string
let score = 100; // TS infiere que es number
```

# Types e interfaces
---
Ambas pueden ser utilizadas incluso de forma intercambiable, hay muy pocas diferencias entre ambos y en la comunidad vas a encontrar ejemplos con ambos.
Es una forma de crear una estructura o agrupar propiedades de un objeto (Express cuenta con una serie de Types ya definidos).

```typescript
type Product = {
    id: number;
    price: number;
    name: string;
}
```
Con eso básicamente creamos una "plantilla" de los objetos para que sus propiedades tengan los tipos de datos que deseamos.
Sin embargo, necesitamos aplicarle a cada objeto ese "type" que hemos creado de la siguiente manera:

```typescript
let product1 : Product = {
    id: 1,
    price: 100,
    name: "Laptop"
}
```
Un interface tiene una sintaxis idéntica excepto por el '=':

```typescript
interface Product {
    id: number;
    price: number;
    name: string;
}
```
Para usarlo en objetos se usa de la misma manera:

```typescript
let product1 : Product = {
    id: 1,
    price: 100,
    name: "Laptop"
}
```
## Diferencias y similitudes entre types e interfaces
Ambas pueden heredar de otras interfaces o types, pero la sintaxis es diferente:

### Simlilitudes
```typescript
// Herencia con interfaces
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
// Herencia con types
type Animal = {
    name: string;
}
type Dog = Animal & {
    breed: string;
}
```
Además de que a partir de un type, se puede heredar un interface:

```typescript
type Animal = {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
```
Podemos también hacer que los tipos en los valores de los interfaces o types dependan de otros interfaces o types, por ejemplo:

```typescript
interface Product {
    id: number;
    price: number;
    name: string;
    category: Category; // Aquí usamos otro interface
}
interface ProductID {
    id: Product["id"]; // Aquí accedemos al tipo de dato de la propiedad id del interface Product
}

type Category = {
    id: number;
    name: string;
}
type CategoryID = {
    id: Product['id']; // Aquí accedemos al tipo de dato de la propiedad id del interface Category a través del interface Product
}
```
Con esto podemos cambiar directamente el tipo de dato de una propiedad en otro interface sin tener que cambiarlo manualmente en ambos lados.

Otra cosa importante, es que ambos solo existen en tiempo de compilación, es decir, no se valida en tiempo de ejecución, por lo que no generan código JS adicional.
### Diferencias
Con los types podemos usar algo que se llama *Utility Types*, los cuales nos permiten extraer o modificar tipos de datos de una forma más sencilla. Algunos ejemplos son:
```typescript
type Product = {
    id: number;
    price: number;
    name: string;
}
// Pick: Extrae ciertas propiedades de un type y crea un nuevo type
type ProductPreview = Pick<Product, "id" | "name">;
// Omit: Crea un nuevo type omitiendo ciertas propiedades
type ProductWithoutPrice = Omit<Product, "price">;
```

Las interfaces por otro lado, se pueden crear varias veces con el mismo nombre y TS las va a fusionar en una sola:

```typescript
interface User {
    id: number;
    name: string;
}   
interface User {
    email: string;
} // Esta interface ahora tiene id, name y email
```

# El peligro del tipo "any"
---
El tipo "any" desactiva la verificación de tipos en TS, lo que puede llevar a errores en tiempo de ejecución si no se usa con cuidado.
Por ejemplo, si declaramos una variable como "any", podemos asignarle cualquier tipo de dato sin que TS nos avise:
```typescript
let data: any;
data = 42; // number
data = "Hello"; // string
data = { name: "John" }; // object
```
Esto puede ser útil en algunas situaciones, pero también puede llevar a errores difíciles de detectar. Por ejemplo, si esperamos que una variable sea un número pero en realidad es una cadena, podemos tener problemas al intentar realizar operaciones matemáticas con ella. Otro ejemplo importante para evitar *any*, es cuando manejamos las respuestas y peticiones en Express:
```typescript
import { Request, Response } from 'express';
const handler = (req: Request, res: Response) => {
    const userId: any = req.params.id; // Usar 'any' aquí es peligroso
    // Si userId no es un número, esto puede causar un error en tiempo de ejecución
    const user = getUserById(userId); 
    res.json(user);
};
```
En este caso, si `req.params.id` no es del tipo esperado, podríamos tener problemas al intentar usar `userId` en funciones que esperan un número.
Para evitar estos problemas, es mejor usar tipos más específicos siempre que sea posible, y solo recurrir a "any" cuando sea absolutamente necesario y estemos seguros de lo que estamos haciendo.

