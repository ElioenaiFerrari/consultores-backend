require('module-alias/register');
const { request, response } = require('express');
const { badRequest, created, ok } = require('@/utils/responseHandle');
const CreditCard = require('@/models/credit_card');

module.exports = {
  async store(req = request, res = response) {
    try {
      CreditCard.create({
        ...req.body,
        vendor_id: req.auth.user.id,
      }).then(created(res));
    } catch (error) {
      return badRequestt(res)(error);
    }
  },

  async index(req = request, res = response) {
    try {
      CreditCard.findAll({
        where: { ...req.query, vendor_id: req.auth.user.id },
      }).then(ok(res));
    } catch (error) {
      return badRequest(res)(error);
    }
  },
};
