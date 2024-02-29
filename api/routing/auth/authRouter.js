const express = require('express');
const router = express.Router();
const login = require('../../api_functions/auth/login');

router.get('/', async (req, res) => {
  res.render('auth/login', { title: 'Homepage' });
});
router.post('/', async (req, res) => {
  login(req.body);
  res.status(200).json(req.body);
});

module.exports = router;
