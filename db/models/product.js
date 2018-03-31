module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "can't be blank"
        },
        async isUnique(name) {
          const product = await Product.findOne({
            where: { name },
            attributes: ['id']
          });
          if (product instanceof Object) {
            throw new Error('product already exists');
          }
          return true;
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: "can't be blank"
        },
        isFloat: {
          msg: 'must me float'
        },
        lteZero(value) {
          if (parseFloat(value, 10) <= 0) {
            throw new Error('price must be greater then 0');
          }
        }
      }
    }
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

  Product.getAll = function(category_id) {
    return this.findAll({
      where: { category_id },
      attributes: ['id', 'name', 'price'],
      raw: true
    });
  };

  return Product;
};
