require('module-alias/register');
const { request, response } = require('express');
const User = require('@/models/user');
const errors = require('@/utils/errors');
const {
  ok,
  created,
  badRequest,
  forbidden,
} = require('@/utils/responseHandle');
const { check, sign } = require('@/utils/auth');

module.exports = {
  async signin(req = request, res = response) {
    try {
      const { email, password } = req.body;

      function verifyIfUserExists(user) {
        if (!user) {
          return notFound(res)(errors.user.notFound);
        }
        return user;
      }

      function checkCredentials(password) {
        return function (user) {
          if (check(password, user.password)) return { user };

          return forbidden(res)(errors.auth.invalidCredentials);
        };
      }

      const sendToken = (res) => (token) => ok(res)({ token });

      User.findOne({ email })
        .then(verifyIfUserExists)
        .then(checkCredentials(password))
        .then(sign)
        .then(sendToken(res))
        .catch(badRequest(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },

  async signup(req = request, res = response) {
    try {
      const { email } = req.body;

      function verifyIfEmailAlreadyInUse(user) {
        if (user) {
          return badRequest(res)(errors.email.mustBeUnique);
        }
        return req.body;
      }

      const createUser = (params) => User.create(params);

      User.findOne({ email })
        .then(verifyIfEmailAlreadyInUse)
        .then(createUser)
        .then(created(res))
        .catch(badRequest(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },
};
