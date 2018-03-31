module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'Galaxy',
      price: 1000.45,
      category_id: 1
    }, {
      id: 2,
      name: 'iPhone',
      price: 1700.12,
      category_id: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
