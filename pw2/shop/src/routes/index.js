import express from 'express';
import userRouter from './users';
import productRouter from './products';
import produtosRouter from './produtos';
import usuariosRouter from './usuarios';
import comprasRouter from './compras';
import compraItemsRouter from './compraItems';
import enderecosRouter from './enderecos';
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
router.use('/compras', comprasRouter);
router.use('/compraitems', compraItemsRouter);
router.use('/enderecos', enderecosRouter);

export default router;
