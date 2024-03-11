const express = require('express');
const router = express.Router();
const articlesRoutes = require('./articleRoutes');

router.use('/articles', articlesRoutes);

module.exports = router;
