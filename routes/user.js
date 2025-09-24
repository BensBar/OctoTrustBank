const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  // BAD: vulnerable to SQL injection via concatenation
  const sql = "SELECT * FROM users WHERE name LIKE '%" + q + "%'";
  const results = await db.query(sql);
  res.json(results);
});

module.exports = router;
