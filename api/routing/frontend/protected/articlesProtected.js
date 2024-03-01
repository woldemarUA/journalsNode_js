const express = require('express');
const router = express.Router();

// auth routes
router.get('/edit', async (req, res) => {
  res.render('./articles/editArticle', { title: 'Editer journal' });
});

router.get('/add', async (req, res) => {
  res.render('./articles/addArticle', { title: 'Ajouter journal' });
});

module.exports = router;
