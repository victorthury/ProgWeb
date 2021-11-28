'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.belongsTo(models.TipoUsuario);
      this.hasMany(models.Compra);
      this.hasMany(models.Endereco);
    }
  };
  Usuario.init({
    tipoUsuarioId: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};