const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);
const db = app.get('db');
const path = require('path');
const filters = require(path.join(process.env.ROOT_DIR + '/services/filters.js'));

/**
 * Get all categories
 */
router.get('/', async (req, res, next) => {
  const tasks = [
    db.Category.getAll(),
    db.Category.count({
    	include: [{
    		model: db.Product,
    		as: 'Products',
    		attributes: ['category_id']
    	}],
    	attributes: ['Products.category_id'],
    	group: 'Products.category_id',
    	raw: true
    })
  ];
  try {
    var [categories, productsCount] = await Promise.all(tasks);
  } catch (err) {
    return next(err);
  }
  if (Array.isArray(productsCount) && productsCount.length > 0) {
    categories.map((category) => {
      let count = 0;
      const found = productsCount.find(e => e instanceof Object && e.category_id === category.id);
      if (found instanceof Object && Number.isInteger(found.count)) {
        count = found.count;
      }
      category.products_count = count;
      return category;
    });
  }

  return res.json(categories);
});

/**
 * Create new category
 */
router.post('/', async (req, res, next) => {
  try {
    var name = req.body.name.trim();
    var category = db.Category.build({ name });
    await category.validate();
  } catch(e) {
    const errors = db.sequelize.assembleErrors(e.errors);
    return res.status(422).json({ errors });
  }
  try {
    await category.save();
  } catch (err) {
    return next(err);
  }
  return res.status(201).json({
    id: category.id,
    name: category.name,
    products_count: 0
  });
});

/**
 * Get products list of selected category
 */
router.get('/:id/products', filters.idIsNumber, async (req, res, next) => {
  const products = await db.Product.getAll(req.params.id);
  return res.json(products);
});

/**
 * Create new products
 */
router.post('/:id/products', filters.idIsNumber, async (req, res, next) => {
  try {
    var data = {
      name: req.body.name.trim(),
      price: req.body.price.trim(),
      category_id: req.params.id
    };
    var product = db.Product.build(data);
    await product.validate();
  } catch(e) {
    const errors = db.sequelize.assembleErrors(e.errors);
    return res.status(422).json({ errors });
  }
  try {
    await product.save();
  } catch (err) {
    return next(err);
  }
  return res.status(201).json({
    id: product.id,
    name: product.name,
    price: product.price
  });
});

app.use('/categories', router);
