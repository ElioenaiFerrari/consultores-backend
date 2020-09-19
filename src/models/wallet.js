const { Model, DataTypes } = require('sequelize');

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        money: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }

  static associate({ User }) {
    this.belongsTo(User, { as: 'owner', foreignKey: 'vendor_id' });
  }
}

module.exports = Wallet;
