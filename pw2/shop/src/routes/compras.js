import express from 'express';
import compraController from '../controllers/compras'

const router = express.Router();

router.get('/', compraController.index)
router.post('/', compraController.create)

export default router
