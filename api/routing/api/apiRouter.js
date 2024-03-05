const express = require('express');
const router = express.Router();
const articlesRoutes = require('./articleRoutes');
const usersRoutes = require('./userRoutes');

router.use('/articles', articlesRoutes);

router.use('/users', usersRoutes);

module.exports = router;
