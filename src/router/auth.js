const router = require('express').Router();
const AuthController = require('@/controllers/auth');

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);

module.exports = (app) => app.use('/auth', router);
