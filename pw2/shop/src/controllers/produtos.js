import { Produto } from '../models/index'
import { Op } from 'sequelize'
import fs from 'fs';

const index = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.send(produtos);
  } catch (error){
    res.status(500).json(error);
  }
}

const create = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    console.log(produto);

    const { id } = produto;
    const { originalname } = req.file;
    const dir = `./public/uploads/${id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const newImageDir = `${dir}/${originalname}`;
    const oldImageDir = `./public/uploads/${originalname}`;

    fs.rename(oldImageDir, newImageDir, err => {
      if (err) throw err;
      console.log('Successfully renamed - AKA moved!')
    });

    res.send(produto);
  } catch (error){
    res.status(500).json(error);
  }
}

const read = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto !== null) {
      res.send(produto);
    } else {
      res.status(404).json({msg: "Produto não encontrado"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [ found ] = await Produto.update(req.body, {where: {id: id}});
    if (found) {
      res.send({msg: "Produto atualizado"})
    } else {
      res.status(404).json({ msg: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.destroy({where: {id: id}});
    if (produto) {
      res.send({msg: "Produto apagado"});
    } else {
      res.status(404).json({ msg: "Produto não encontrado" });
    }
  } catch (error) {
      res.status(500).json(error);
  }
}

export default { index, create, read, update, remove }
