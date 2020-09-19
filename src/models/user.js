require('module-alias/register');
const { hashPassword } = require('@/utils/auth');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave(user) {
            user.password = hashPassword(user.password);
          },
        },
      }
    );
  }

  static associate({ Product, Wallet, CreditCard, Sale }) {
    this.hasMany(Product, { as: 'products', foreignKey: 'vendor_id' });
    this.hasOne(Wallet, { as: 'wallet', foreignKey: 'vendor_id' });
    this.hasMany(CreditCard, { as: 'credit_cards', foreignKey: 'vendor_id' });
    this.hasMany(Sale, {
      as: 'sales',
      foreignKey: 'from_id',
    });
  }
}

module.exports = User;
