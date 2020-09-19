const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        maker: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associate({ User }) {
    this.belongsTo(User, { as: 'vendor', foreignKey: 'vendor_id' });
  }
}

module.exports = Product;
