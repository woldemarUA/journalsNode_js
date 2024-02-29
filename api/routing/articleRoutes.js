const express = require('express');
const router = express.Router();
const { upload } = require('../utilities/upload');
const { getArticles } = require('../api_functions/getArticles');
const { getArticle } = require('../api_functions/getArticle');
const { deleteArticle } = require('../api_functions/deleteArticle');
const { formUpload } = require('../utilities/formUpload');
// articles
router.get('/', async (req, res) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

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

router.post('/', upload.single('article-image'), formUpload);
router.post('/edit', upload.single('article-image'), formUpload);

router.get('/delete/:id', deleteArticle);

module.exports = router;
