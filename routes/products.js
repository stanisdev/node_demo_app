const express = require('express');
const router = express.Router();
const app = require(process.env.APP_PATH);

router.get('/', (req, res, next) => {
  res.send('Products');
});

app.use('/products', router);
