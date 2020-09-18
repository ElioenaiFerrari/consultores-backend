const AuthRepository = require('@/repositories/auth');

module.exports = {
  signin: (req, res) => AuthRepository.signin(req, res),
  signup: (req, res) => AuthRepository.signup(req, res),
};
