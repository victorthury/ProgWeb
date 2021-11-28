import { Endereco, Usuario } from '../models';

const index = async (req, res) => {
  try {
    const Enderecos = await Endereco.findAll({ include: Usuario });
    res.send(Enderecos);
  } catch (error) {
    res.status(500).send(error);
  }
}
const create = async (req, res) => {
  try {
    const endereco = await Endereco.create(req.body);
    res.send({ msg: 'Endereco criada', endereco });
  } catch (error) {
    res.status(500).send(error);
  }
}

const read = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    console.log(usuarioId)
    const enderecos = await Endereco.findAll({ where: { usuarioId }, include: Usuario });
    console.log(enderecos)
    if (enderecos.length > 0) {
      res.send(enderecos);
    } else {
      res.status(404).send({ msg: 'Não há endereços registrados para esse usuário, favor adicionar um.' })
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { index, create, read }
