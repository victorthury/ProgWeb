import express from 'express';
import userRouter from './routes/users';
import productRouter from './routes/products';

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/products', productRouter);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`)
});
