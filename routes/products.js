var express = require('express');
const pool = require('../db');
var router = express.Router();

/* GET products listing. */
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
