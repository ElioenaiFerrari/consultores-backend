require('module-alias/register');
const Sale = require('@/models/sale');
const User = require('@/models/user');
const { badRequest, ok } = require('@/utils/responseHandle');
const { request, response } = require('express');

module.exports = {
  async store(req = request, res = response) {
    try {
      const { user } = req.auth;
      const { to_id, value } = req.body;

      const createSale = (to) => {
        return Sale.create({
          from_id: user.id,
          to_id: to.id,
          value,
        }).then(ok(res));
      };

      const isMe = (me) => (user) => {
        if (me.id === user.id) {
          return badRequest(res)({
            error: 'two ids are equals',
          });
        }

        return user;
      };

      User.findOne({ id: to_id })
        .then(isMe(user))
        .then(createSale)
        .catch(badRequest(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },

  async index(req = request, res = response) {
    try {
      Sale.findAll({
        where: req.query,
        include: [
          {
            model: User,
            as: 'vendor',
            foreignKey: 'from_id',
          },
          {
            model: User,
            as: 'customer',
            foreignKey: 'to_id',
          },
        ],
      })
        .then(ok(res))
        .catch(badRequest(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },
};
