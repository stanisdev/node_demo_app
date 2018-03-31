const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);

/**
 * Get all categories
 */
router.get('/', (req, res, next) => {
  res.json({});
});

/**
 * Create new category
 */
router.post('/', (req, res, next) => {
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
