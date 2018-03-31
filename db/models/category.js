module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    timestamp: false
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Products, {
      as: 'Products',
      foreignKey: 'categoryId',
      sourceKey: 'id'
    })
  };

  return Category;
};
