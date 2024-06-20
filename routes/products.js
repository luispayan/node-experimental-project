var express = require('express');
var router = express.Router();
const verifyToken = require('../middlewares/auth');
const Product = require('../models/Product');

/* GET products. */
router.get('/', verifyToken, async function(req, res, next) {
  try {
    const products = await Product.getProducts();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Create product. */
router.post('/', verifyToken, async function(req, res, next) {
  try {
    const response = await Product.createProduct(req.body);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Update product. */
router.put('/:id', verifyToken, async function(req, res, next) {
  try {
    const response = await Product.updateProduct(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Delete product. */
router.delete('/:id', verifyToken, async function(req, res, next) {
  try {
    const response = await Product.deleteProduct(req.params.id);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
