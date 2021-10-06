import express from 'express';
import userRouter from './users';
import productRouter from './products';
import produtosRouter from './produtos';
import usuariosRouter from './usuarios';
import mainRouter from './main';

const router = express.Router();

// main route
router.use('/', mainRouter);
// rotas exercício 01
router.use('/users', userRouter);
router.use('/products', productRouter);
// rotas shop
router.use('/produtos', produtosRouter);
router.use('/usuarios', usuariosRouter);

export default router;
