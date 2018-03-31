'use strict';
module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    timestamp: false
  });

  Product.associate = function(models) {
    models.Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      constraints: false
    });
  };

  return Product;
};
