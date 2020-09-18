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

      function connectModels(models) {
        return function (sequelize) {
          return map(function (model) {
            model.init(sequelize);

            if (model.associations) {
              model.associations(sequelize.models);
            }
          })(models);
        };
      }

      pipe(connection, connectModels(Object.values(models)))(dbConfig);

      return connection;
    },
  },

  mongo: {
    connect: () => dbConfig,
  },
};

module.exports = configs[process.env.DB_DIALECT].connect();
