const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);

/**
 * Remove product by id
 */
router.delete('/:id', (req, res, next) => {
  res.status(204).json({});
});

app.use('/products', router);
