const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);
const db = app.get('db');
const path = require('path');
const filters = require(path.join(process.env.ROOT_DIR + '/services/filters.js'));


/**
 * Remove product by id
 */
router.delete('/:id', filters.idIsNumber, async (req, res, next) => {
  const product = await db.Product.findById(req.params.id);
  if (!(product instanceof Object)) {
    return res.status(422).json({
      message: 'Product not exists'
    });
  }
  try {
    await product.destroy();
  } catch (err) {
    next(err);
  }
  return res.status(204).json({});
});

app.use('/products', router);
