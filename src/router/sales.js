require('module-alias/register');
const router = require('express').Router();
const { store, index } = require('@/controllers/sales');

router.post('/', store);
router.get('/', index);

module.exports = (app) => app.use('/app/sales', router);
