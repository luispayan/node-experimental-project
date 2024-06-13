var express = require('express');
const pool = require('../db');
var router = express.Router();
const verifyToken = require('../middlewares/auth');

/* GET products listing. */
router.get('/', verifyToken, async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
