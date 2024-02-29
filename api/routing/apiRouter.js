const express = require('express');
const articlesRoutes = require('./articleRoutes');
// const usersRoutes = require('./usersRoutes');
const router = express.Router();
router.use('/articles', articlesRoutes);

module.exports = router;
