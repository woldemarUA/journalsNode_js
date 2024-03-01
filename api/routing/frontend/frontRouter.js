const express = require('express');
const router = express.Router();
const articlesRoutes = require('./articlesRoutes');

router.use('/', articlesRoutes);
router.use('/articles', articlesRoutes);
module.exports = router;
