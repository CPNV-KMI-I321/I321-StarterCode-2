import { Router } from 'express';
import pizzas from './pizzas.js';
import ingredients from './ingredients.js';

const router = Router();
router.use('/pizzas', pizzas);
router.use('/ingredients', ingredients);
export default router;
