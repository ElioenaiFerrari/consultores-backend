const mongoose = require('mongoose');

module.exports = {
  makeSchema: (params) => new mongoose.Schema(params),
  makeModel: (name) => (schema) => mongoose.model(name, schema),
};
