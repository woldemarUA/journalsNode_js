const express = require('express');
const router = express.Router();
const { upload } = require('../../utilities/upload');
const {
  fetchApprovedArticles,
  fetchPendingApprovalArticles,
  changeStatus,
  fetchUserArticles,
} = require('../../api_functions/articles/getArticles');
const getArticle = require('../../api_functions/articles/getArticle');
const deleteArticle = require('../../api_functions/articles/deleteArticle');
const formUpload = require('../../utilities/formUpload');
const ensureApiAuthenticated = require('../auth/ensureAPIAuthenticated');
const extractId = require('../../utilities/extractId');

router.post('/upload', upload.single('article-image'), (req, res) => {
  let image;
  console.log('hello from upload');
  console.log(req.file);
  // Si un fichier est téléchargé, extraire le chemin de l'image
  try {
    if (req.file) {
      image = req.file.path.slice(req.file.path.indexOf('/') + 1);
    }
    res.status(200).json({ image });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// articles
router.get('/:id', async (req, res) => {
  const id = extractId(req);
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
    const articles = await fetchApprovedArticles();

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// auth routes

router.post(
  '/add',
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

// admin
router.get('/admin/pending', ensureApiAuthenticated, async (req, res) => {
  try {
    const articles = await fetchPendingApprovalArticles();

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.get('/user/:id', ensureApiAuthenticated, async (req, res) => {
  try {
    const userId = extractId(req);
    const articles = await fetchUserArticles(userId);

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.patch('/admin/approve/:id', ensureApiAuthenticated, async (req, res) => {
  try {
    const id = extractId(req);
    const msg = await changeStatus(id);
    res.status(200).json(msg);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
