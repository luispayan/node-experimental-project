var express = require('express');
var router = express.Router();
import { verifyToken } from '../middlewares/auth';
import Product from '../models/Product';

/* GET products. */
router.get('/', verifyToken, async function(req: any, res: any, next: any) {
  try {
    const products = await Product.getProducts();
    res.json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Create product. */
router.post('/', verifyToken, async function(req: any, res: any, next: any) {
  try {
    const response = await Product.createProduct(req.body);
    res.json(response);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Update product. */
router.put('/:id', verifyToken, async function(req: any, res: any, next: any) {
  try {
    const response = await Product.updateProduct(req.params.id, req.body);
    res.json(response);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* Delete product. */
router.delete('/:id', verifyToken, async function(req: any, res: any, next: any) {
  try {
    const response = await Product.deleteProduct(req.params.id);
    res.json(response);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
