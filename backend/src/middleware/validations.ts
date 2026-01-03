import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    // Manejar errores
    // validationResult extrae los errores de la solicitud
    let errors = validationResult(req); // Extrae los errores de la solicitud
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}