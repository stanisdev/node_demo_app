module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    createdAt: false,
    updatedAt: false,
    timestamp: false
  });

  Product.associate = function(models) {
    models.Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
      constraints: false
    });
  };

  return Product;
};
