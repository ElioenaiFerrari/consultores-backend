require('dotenv/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  salts: () => Number(process.env.HASH_SALTS),
  genSalts: () => bcrypt.genSaltSync(this.salts),
  hashPassword: (password) => bcrypt.hashSync(password, this.genSalts),
  sign: (params) => jwt.sign(params, process.env.APP_SECRET),
  check: (password, hash) => bcrypt.compareSync(password, hash),
  verify: (authorization) => jwt.verify(authorization, process.env.APP_SECRET),
};
