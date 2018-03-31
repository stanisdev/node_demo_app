const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);
const db = app.get('db');

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
  const [categories, productsCount] = await Promise.all(tasks);
  categories.map((category) => {
    const found = productsCount.find(e => e.category_id === category.id);
    let count = 0;
    if (found instanceof Object && Number.isInteger(found.count)) {
      count = found.count;
    }
    category.products_count = count;
    return category;
  });

  return res.json(categories);
});

/**
 * Create new category
 */
router.post('/', async (req, res, next) => {
  try {
    await db.Category.build({
      name: req.body.name
    }).save();
  } catch(e) {
    return next(e);
  }
  res.status(201).json({});
});

/**
 * Get products list of selected category
 */
router.get('/:id/products', (req, res, next) => {
  res.json({});
});

/**
 * Create new products
 */
router.post('/:id/products', (req, res, next) => {
  res.status(201).json({});
});

app.use('/categories', router);
