require('module-alias/register');
require('dotenv/config');
const dbConfig = require('@/config/database');
const { Sequelize } = require('sequelize');
const requireDir = require('require-dir');
const { map, pipe } = require('@/utils/tools');

const configs = {
  postgres: {
    connect() {
      const models = requireDir('../models');

      const connection = (config) => new Sequelize(config);

      const initModel = (sequelize) => (model) => {
        model.init(sequelize);

        return sequelize;
      };

      const initModels = (models) => (sequelize) => {
        map(initModel(sequelize))(models);

        return sequelize;
      };

      const associateModel = (sequelize) => (model) => {
        if (model.associate) {
          model.associate(sequelize.models);
        }

        return sequelize;
      };

      const associateModels = (models) => (sequelize) => {
        map(associateModel(sequelize))(models);

        return sequelize;
      };

      pipe(
        connection,
        initModels(Object.values(models)),
        associateModels(Object.values(models))
      )(dbConfig);

      return connection;
    },
  },

  mongo: {
    connect: () => dbConfig,
  },
};

module.exports = configs[process.env.DB_DIALECT].connect();
