const express = require('express');
const router = express.Router();
const getArticles = require('../../api_functions/articles/getArticles');
const getArticle = require('../../api_functions/articles/getArticle');
const ensureAuthenticated = require('../auth/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const articles = await getArticles();

    res.render('index', { title: 'Homepage', articles });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = await getArticle(id);

    res.render('./articles/article', { title: 'Homepage', article });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// auth routes
router.get('/edit', ensureAuthenticated, async (req, res) => {
  res.render('./articles/editArticle', { title: 'Editer journal' });
});

router.get('/add', ensureAuthenticated, async (req, res) => {
  res.render('./articles/addArticle', { title: 'Ajouter journal' });
});

module.exports = router;
