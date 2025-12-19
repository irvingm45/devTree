import { Router } from 'express';
import createAccount from './handlers';

const router = Router();

// Authentication and registration routes
// Instead of using 'get', we use 'post' for better security
router.post('/auth/register', createAccount);

export default router;