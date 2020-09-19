const { Model, DataTypes } = require('sequelize');

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        holder: DataTypes.STRING,
        number: DataTypes.STRING,
        validity: DataTypes.STRING,
        cvv: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associate({ User }) {
    this.belongsTo(User, { as: 'owner', foreignKey: 'vendor_id' });
  }
}

module.exports = CreditCard;
