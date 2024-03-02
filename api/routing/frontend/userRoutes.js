const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('./users/dashboard', { title: 'Your dashboard' });
});

module.exports = router;
