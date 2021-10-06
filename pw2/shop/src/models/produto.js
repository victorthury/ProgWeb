'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Produto.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome precisa conter entre 3 e 50 caracteres"
        },
      },
    },
    preco: DataTypes.DECIMAL(12,2),
    // imagem: DataTypes.BLOB,
    estoque: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};