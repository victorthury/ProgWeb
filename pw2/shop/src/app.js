import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes';
import userRouter from './routes/users';
import productRouter from './routes/products';
const path = require('path');

require('dotenv').config()

const app = express();

// middlewares
app.use(cors({ origin: 'http://localhost:3021', credentials: true }))
app.use(express.json());
app.use('/image', express.static(path.join(__dirname, '../public/uploads')));

app.use(session({
  genid: () => uuid(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { expires: 100000 }
}));

app.use(routes);

app.get('/uuid', (req, res) => {
  res.send({ uuid: uuid()});
});

// swagger

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`listening on port ${process.env.NODE_DOCKER_PORT}.`);
});
