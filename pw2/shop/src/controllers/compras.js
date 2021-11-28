import { Compra, Usuario } from  '../models';

const index = async (req, res) => {
  try {
    const compras = await Compra.findAll({ include: Usuario });
    res.send(compras);
  } catch (error) {
    res.status(500).send(error);
  }
}
const create = async (req, res) => {
  try {
    const compra = await Compra.create(req.body);
    res.send({ msg: 'Compra criada', compra});
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { index, create }
