require('module-alias/register');
require('dotenv/config');
const chalk = require('chalk');
const { pipe } = require('@/utils/tools');
const mongoose = require('mongoose');

const configs = {
  postgres: {
    development() {
      return {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
          timestamps: true,
          underscored: true,
        },
      };
    },
    production() {
      return {
        username: 'postgres',
        password: 'password',
        database: 'database',
        host: '127.0.0.1',
        dialect: 'postgres',
        define: {
          timestamps: true,
          underscored: true,
        },
      };
    },
  },

  mongo: {
    async development() {
      const isReady = ({ connection }) => connection.readyState === 1;
      const connectionStatus = (online) => (online ? 'Online' : 'Offline');
      const info = (status) => console.log(chalk.yellow(`MongoDB ${status}`));
      const handleError = (error) => console.log(chalk.red(`[ERROR] ${error}`));

      try {
        const params = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };

        mongoose
          .connect(process.env.DB_HOST, params)
          .then(isReady)
          .then(connectionStatus)
          .then(info)
          .catch(handleError);
      } catch (error) {
        handleError(error);
      }
    },
  },
};

module.exports = configs[process.env.DB_DIALECT][process.env.NODE_ENV]();
