import express from 'express';
import produtosController from '../controllers/produtos'
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage });
const router = express.Router();

router.get('/', produtosController.index);
router.post('/', upload.single('imagem'), produtosController.create);
router.get('/:id', produtosController.read);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.remove);

export default router