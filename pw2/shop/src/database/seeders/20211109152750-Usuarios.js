'use strict';
// criando um usuario colaborador no seeder
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [{
      nome: 'admin',
      email: 'admin',
      tipoUsuarioId: 1,
      senha: '$2a$10$HRldUQkSuKqQAj2NWREVGeGH/FQ2nkeG3Zxcnf9RO/bP1lkAfQ.cq',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
