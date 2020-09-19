'use strict';
require('module-alias/register');
const timestamps = require('@/utils/timestamps');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('credit_cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      holder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      validity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...timestamps(Sequelize),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('credit_cards');
  },
};
