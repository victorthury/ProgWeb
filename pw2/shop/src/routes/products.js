// Exercício 01
import express from 'express';
import productsController from '../controllers/products'

const router = express.Router();

router.get('/', productsController.index);
router.post('/', productsController.create);
router.get('/:id', productsController.read);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

export default router;
