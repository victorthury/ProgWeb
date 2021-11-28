'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      this.belongsToMany(models.Compra, {
        through: 'CompraItems'
      });
    }
  };
  Produto.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome precisa conter entre 3 e 100 caracteres"
        },
      },
    },
    preco: DataTypes.DECIMAL(12,2),
    descricao: DataTypes.STRING,
    estoque: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};