import bcrypt from 'bcryptjs';
import { Usuario, TipoUsuario } from '../models/'

const index = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: TipoUsuario});
    res.send(usuarios)
  } catch (error) {
    res.status(500).send(error)
  }
  
}
const create = async (req, res) => {
  try {
    bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) => {
      bcrypt.hash(req.body.senha, salt, async (err, hash) => {
        await Usuario.create({ ...req.body, senha: hash});
        res.send({ msg: 'Usuário criado' });
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { index, create }
