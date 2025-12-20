import User from "../models/User";
import { validationResult } from "express-validator";
import slug from 'slug';
import { Request, Response } from 'express';
import { hashPassword } from "../utils/auth";

const createAccount =  async (req : Request, res: Response) => {

    // Manejar errores
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

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