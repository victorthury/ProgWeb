'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Enderecos', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'usuario_Fk', // pelo visto, nao pode ter outro usuariFk, entao coloquei em snakecase
      references: {
        table: 'Usuarios',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Enderecos',
      'usuario_Fk'
    );
  }
};
