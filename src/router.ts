import { Router } from 'express';
import { body } from 'express-validator';
import createAccount from './handlers';

const router = Router();

// Authentication and registration routes
// Instead of using 'get', we use 'post' for better security
router.post('/auth/register', 
    body('handle').notEmpty(),
    createAccount);

export default router;