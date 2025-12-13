import { Router } from 'express';

const router = Router();

// Authentication and registration routes
// Instead of using 'get', we use 'post' for better security
router.post('/auth/register', (req, res) => {
    console.log('From Register');

    console.log(req.body);
});

export default router;