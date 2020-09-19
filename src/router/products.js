require('module-alias/register');
const router = require('express').Router();
const { store, index } = require('@/controllers/products');

router.post('/', store);
router.get('/', index);

module.exports = (app) => app.use('/app/products', router);
