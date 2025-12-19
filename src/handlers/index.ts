import User from "../models/User";
import { Request, Response } from 'express';
import { hashPassword } from "../utils/auth";

const createAccount =  async (req : Request, res: Response) => {

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if(userExists){
        const error = new Error('El usuario ya existe');
        return res.status(409).json({ error: error.message }); // Esto solo entrega una respuesta
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);


    await user.save();
    res.status(201).send('User registered successfully');
};

export default createAccount;