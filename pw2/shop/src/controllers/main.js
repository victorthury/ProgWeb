import bcrypt from 'bcryptjs';
import { Usuario } from '../models'

const signup = async(req, res) => {
  try {
    bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) => {
      bcrypt.hash(req.body.senha, salt, async (err, hash) => {
        await Usuario.create({ ...req.body, senha: hash });
        res.send({ msg: 'Usuário criado' });
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

const login = async(req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      bcrypt.compare(senha, usuario.senha, (err, ok) => {
        if (ok) {
          req.session.userId = usuario.id;
          res.send({msg: 'Usuario logado'});
        } else {
          res.send({msg: 'Senha não confere'});
        }
      })
    } else {
      res.send({ msg: 'Email inválido' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const logout = async(req, res) => {
  req.session.destroy(() => {
    res.send({msg: "Sessão finalizada"});
  })
}

export default { signup, login, logout }
