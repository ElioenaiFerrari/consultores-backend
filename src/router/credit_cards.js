require('module-alias/register');
const router = require('express').Router();
const { store, index } = require('@/controllers/credit_cards');

router.post('/', store);
router.get('/', index);

module.exports = (app) => app.use('/app/credit_cards', router);
