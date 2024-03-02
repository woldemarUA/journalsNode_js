const express = require('express');
const router = express.Router();
const articlesRoutes = require('./articlesRoutes');
const usersRoutes = require('./userRoutes');

router.use('/', articlesRoutes);
router.use('/articles', articlesRoutes);
router.use('/user', usersRoutes);
module.exports = router;
