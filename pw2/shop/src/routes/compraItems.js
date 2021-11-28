import express from 'express';
import compraItemsController from '../controllers/compraItems'

const router = express.Router();

router.get('/', compraItemsController.index)
router.post('/', compraItemsController.create)

export default router
