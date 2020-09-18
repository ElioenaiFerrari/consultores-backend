require('module-alias/register');
const { request, response } = require('express');
const { badRequest, ok } = require('@/utils/responseHandle');

module.exports = {
  async uploadPhotos(req = request, res = response) {
    try {
      return ok(res)({
        success: true,
      });
    } catch (error) {
      return badRequest(res)(error);
    }
  },
};
