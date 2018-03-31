module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "can't be blank"
        },
        async isUnique(name) {
          const category = await Category.findOne({
            where: { name },
            attributes: ['id']
          });
          if (category instanceof Object) {
            throw new Error('category already exists');
          }
          return true;
        }
      }
    },
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
