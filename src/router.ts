import { Router } from 'express';

const router = Router();

//Routing
router.get('/', (req, res) => {
    res.send('Hola mundo en Express desde router');
});

//Routing
router.get('/nosotros', (req, res) => {
    res.send('Nosotros');
});

//Routing
router.get('/blog', (req, res) => {
    res.send('Blog');
});

export default router;