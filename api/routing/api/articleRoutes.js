const express = require('express');
const router = express.Router();
const passport = require('passport');
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

const extractId = require('../../utilities/extractId');

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
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('imageArticle'),
  formUpload
);
router.patch(
  '/edit/:id',

  passport.authenticate('jwt', { session: false }),
  upload.single('imageArticle'),
  formUpload
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteArticle
);

// admin
router.get(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = extractId(req);
      const articles = await fetchUserArticles(userId);

      res.status(200).json(articles);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);
router.get(
  '/admin/pending',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const articles = await fetchPendingApprovalArticles();

      res.status(200).json(articles);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

router.patch(
  '/admin/approve/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const id = extractId(req);
      const msg = await changeStatus(id);
      res.status(200).json(msg);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
