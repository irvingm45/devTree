import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import slug from 'slug';
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

const createAccount =  async (req : Request, res: Response) => {


    const { email, password } = req.body;

    // Verificar si el email ya existe
    const userExists = await User.findOne({ email });
    if(userExists){
        const error = new Error('Un usuario con ese mail ya esta registrado');
        return res.status(409).json({ error: error.message }); // Esto solo entrega una respuesta
    }

    // Verificar si el handle ya existe
    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if(handleExists){
        const error = new Error('El handle ya existe');
        return res.status(409).json({ error: error.message }); // Esto solo entrega una respuesta
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();
    res.status(201).send('User registered successfully');
};

export default createAccount;
export const login = async (req : Request, res : Response) => {
    // Manejar errores
    let errors = validationResult(req); // Extrae los errores de la solicitud
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Verificamos que el usuario exista en nuestro base
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('No existe un usuario con ese email');
        return res.status(401).json({ error: error.message });
    }

    // Comprobar la contraseña
    const verificarContraseña = await checkPassword(password, user.password);
    if(!verificarContraseña) {
        const error = new Error('La contraseña es incorrecta');
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({ message: 'Login successful' });
}