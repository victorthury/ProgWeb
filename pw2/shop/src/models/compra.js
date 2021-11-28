'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario);
      this.belongsToMany(models.Produto, {
        through: 'CompraItems'
      });
    }
  };
  Compra.init({
    usuarioId: DataTypes.INTEGER,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};