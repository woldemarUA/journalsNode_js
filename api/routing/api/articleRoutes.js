const express = require('express');
const router = express.Router();
const { upload } = require('../../utilities/upload');
const getArticles = require('../../api_functions/articles/getArticles');
const getArticle = require('../../api_functions/articles/getArticle');
const deleteArticle = require('../../api_functions/articles/deleteArticle');
const formUpload = require('../../utilities/formUpload');
const ensureApiAuthenticated = require('../auth/ensureAPIAuthenticated');
// articles
router.get('/:id', async (req, res) => {
  let id = req.params.id;
  id = parseInt(id, 10);
  try {
    const article = await getArticle(id);
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// auth routes

router.post(
  '/',
  ensureApiAuthenticated,
  upload.single('article-image'),
  formUpload
);
router.post(
  '/edit',
  ensureApiAuthenticated,
  upload.single('article-image'),
  formUpload
);

router.get('/delete/:id', ensureApiAuthenticated, deleteArticle);

module.exports = router;
