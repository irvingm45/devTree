import { Router } from 'express';
import { body } from 'express-validator';
import createAccount, { login } from './handlers';
import { handleInputErrors } from './middleware/validations';

const router = Router();

// Authentication and registration routes
// Instead of using 'get', we use 'post' for better security

router.post('/auth/register', 
    // Validation middleware
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('handle')
        .notEmpty()
        .withMessage('Handle is required'),
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    // Middleware to handle input errors
    handleInputErrors,
    // We call the handler to create the account
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password must not be empty'),
    login
)
export default router;