require('module-alias/register');
const { Model, DataTypes } = require('sequelize');

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        to_id: DataTypes.STRING,
        value: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate({ User }) {
    this.belongsTo(User, { as: 'vendor', foreignKey: 'from_id' });
    this.belongsTo(User, { as: 'customer', foreignKey: 'to_id' });
  }
}

module.exports = Sale;
