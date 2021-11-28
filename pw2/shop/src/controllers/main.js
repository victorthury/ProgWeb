import bcrypt from 'bcryptjs';
import { Usuario, TipoUsuario } from '../models'

const signup = async(req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) => {
        bcrypt.hash(senha, salt, async (err, hash) => {
          await Usuario.create({ ...req.body, senha: hash });
          res.send({ msg: 'Usuário criado' });
        });
      });
    } else {
      res.status(409).send({ msg: 'Usuário já existe', conflict: true })
    }
    
  } catch (error) {
    console.log('====================================================')
    console.log(error);
    res.status(500).send(error);
  }
}

const login = async(req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email }, include: TipoUsuario });
    if (usuario) {
      bcrypt.compare(senha, usuario.senha, (err, ok) => {
        if (ok) {
          req.session.userId = usuario.id;
          req.session.tipoUsuario = usuario.TipoUsuario.rotulo;
          res.send(usuario);
        } else {
          res.status(401).send({ msg: 'Email e/ou senha inválidos', loginSuccess: false});
        }
      })
    } else {
      res.status(401).send({ msg: 'Email e/ou senha inválidos', loginSuccess: false });
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
