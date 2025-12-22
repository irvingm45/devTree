import { Router } from 'express';
import { body } from 'express-validator';
import createAccount from './handlers';

const router = Router();

// Authentication and registration routes
// Instead of using 'get', we use 'post' for better security
router.post('/auth/register', 
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('handle')
        .notEmpty()
        .withMessage('Handle is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    createAccount);

export default router;