import express from 'express';
import authUtils from '../utils/auth';
import produtosController from '../controllers/produtos'
import upload from '../../middleware/upload'

const router = express.Router();

router.get('/', produtosController.index);
// router.post('/', authUtils.verifyAuth, upload.single('imagem'), produtosController.create);
router.post('/', authUtils.isColaborator, authUtils.verifyAuth, upload.single('imagem'), produtosController.create);
// router.post('/', upload.single('imagem'), produtosController.create);
router.get('/:id', produtosController.read);
router.put('/:id', authUtils.isColaborator, authUtils.verifyAuth, produtosController.update);
router.delete('/:id', authUtils.isColaborator, authUtils.verifyAuth, produtosController.remove);

export default router