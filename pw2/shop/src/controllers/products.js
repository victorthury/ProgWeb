// Exercício 01
import { v4 as uuidv4 } from 'uuid';

const products = [];

const index = (req, res) => {
  res.send(products);
}

const create = (req, res) => {
  const product = req.body;
  products.push({ ...product, id: uuidv4() });
  return res.status(201).json();
}

const read = (req, res) => {
  const { id, } = req.params;
  const product = products.filter(product => product.id === id);

  res.send(product);
}

const update = (req, res) => {
  const { id } = req.params;
  const {
    productName,
    price,
  } = req.body;

  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    return res.status(404).json();
  }
  
  if (productName) {
    products[index].productName = productName;
  }

  if (price) {
    products[index].price = price;
  }

  res.send(products[index]);
}

const remove = (req, res) => {
  const { id } = req.params;
  const product = products.filter(product => product.id === id);
  const index = products.findIndex(product => product.id === id);
  products.splice(index, 1);

  res.send(product);
}

export default { index, create, read, update, remove };
