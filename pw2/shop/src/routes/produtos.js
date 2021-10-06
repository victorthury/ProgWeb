import express from 'express';
import authUtils from '../utils/auth';
import produtosController from '../controllers/produtos'
import upload from '../../middleware/upload'

const router = express.Router();

router.get('/', produtosController.index);
router.post('/', authUtils.verifyAuth, upload.single('imagem'), produtosController.create);
router.get('/:id', produtosController.read);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.remove);

export default router