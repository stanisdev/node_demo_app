module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    createdAt: false,
    updatedAt: false,
    timestamp: false
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Product, {
      as: 'Products',
      foreignKey: 'category_id',
      sourceKey: 'id'
    });
  };

  Category.getAll = function() {
    return this.findAll({
      attributes: ['id', 'name'],
      order: [
        ['id', 'ASC']
      ],
      raw: true
    });
  };

  return Category;
};
