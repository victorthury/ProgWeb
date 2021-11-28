import express from 'express';
import enderecoController from '../controllers/enderecos'

const router = express.Router();

router.get('/', enderecoController.index)
router.post('/', enderecoController.create)
router.get('/:usuarioId', enderecoController.read);

export default router
