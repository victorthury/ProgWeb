'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario);
    }
  };
  Endereco.init({
    usuarioId: DataTypes.INTEGER,
    logradouro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};