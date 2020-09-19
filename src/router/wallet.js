require('module-alias/register');
const router = require('express').Router();

module.exports = (app) => app.use('/app/wallet', router);
