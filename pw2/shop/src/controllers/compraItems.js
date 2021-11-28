import { CompraItem, Compra, Produto } from '../models';

const index = async (req, res) => {
  try {
    const compraItems = await CompraItem.findAll();
    res.send(compraItems);
  } catch (error) {
    res.status(500).send(error);
  }
}
const create = async (req, res) => {
  try {
    const compraItems = await CompraItem.bulkCreate(req.body);
    console.log(req.body)
    res.send({ msg: 'Compra de items criada', compraItems });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { index, create }
