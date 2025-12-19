import { model, Schema } from 'mongoose';

export interface IUser {
    handle : string;
    name: string;
    email: string;
    password: string;
}
// Definicion del esquema de usuario
const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

// Definición del modelo de usuario
const User = model<IUser>('User', userSchema);
export default User;

// Ejemplo de creación de un usuario
//const usuarioEjemplo = new User({ name: 'Juan', email: 'prueba@gmail.com', password: '12345'});