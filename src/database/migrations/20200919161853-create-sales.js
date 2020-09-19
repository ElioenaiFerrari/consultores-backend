'use strict';
require('module-alias/register');
const timestamps = require('@/utils/timestamps');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      from_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      to_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ...timestamps(Sequelize),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales');
  },
};
