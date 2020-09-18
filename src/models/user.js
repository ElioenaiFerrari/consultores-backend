require('dotenv/config');
require('module-alias/register');
const { hashPassword } = require('@/utils/auth');
const { makeSchema, makeModel } = require('@/utils/mongo');
const { pipe } = require('@/utils/tools');

const schema = makeSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre('save', function (next) {
  const updatePassword = (hash) => this.set('password', hash);
  const save = () => this.save();
  pipe(hashPassword, updatePassword, save)(this.get('password'));

  next();
});

module.exports = makeModel('User')(schema);
