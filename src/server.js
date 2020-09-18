require('dotenv/config');
require('module-alias/register');
const chalk = require('chalk');

const server = require('@/config/app');

server.listen(process.env.PORT, function () {
  console.log(
    chalk.cyan(`Server online in http://localhost:${process.env.PORT}`)
  );
});
