import express from 'express';
import userRouter from './routes/users';
import productRouter from './routes/products';
import produtosRouter from './routes/produtos';

require('dotenv').config()

const app = express();
const PORT = 3000;

app.use(express.json());
// rotas exercício 01
app.use('/users', userRouter);
app.use('/products', productRouter);

// rotas shop
app.use('/produtos', produtosRouter);

// swagger
var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`listening on port ${process.env.NODE_DOCKER_PORT}.`)
});
