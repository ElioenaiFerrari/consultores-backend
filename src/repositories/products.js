require('module-alias/register');
const { request, response } = require('express');
const { badRequest, created, ok } = require('@/utils/responseHandle');
const Product = require('@/models/product');
const User = require('@/models/user');

module.exports = {
  async store(req = request, res = response) {
    console.log(req.auth);
    try {
      Product.create({
        ...req.body,
        vendor_id: req.auth.user.id,
      }).then(created(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },

  async index(req = request, res = response) {
    try {
      Product.findAll({
        where: req.query,
        // include: {
        //   model: User,
        //   as: 'vendor',
        // },
      }).then(ok(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },
};
