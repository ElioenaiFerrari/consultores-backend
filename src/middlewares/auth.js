require('dotenv/config');
require('module-alias/register');
const { request, response } = require('express');
const { unauthorized, forbidden } = require('@/utils/responseHandle');
const { verify } = require('@/utils/auth');
const { pipe } = require('@/utils/tools');

function auth(req = request, res = response, next) {
  try {
    function checkCredentials({ authorization }) {
      if (!authorization) {
        return unauthorized(res)({ error: 'unauthorized' });
      }

      return authorization.split(' ')[1];
    }

    const setAuth = (req) => (user) => (req.auth = user.token);
    pipe(checkCredentials, verify, setAuth(req))(req.headers);

    return next();
  } catch (error) {
    return forbidden(res)(error);
  }
}

module.exports = (app) => app.use('/app', auth);
