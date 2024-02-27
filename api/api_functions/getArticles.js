const { Article } = require('../dbModels/dbInit');

async function getArticles(req, res) {
  try {
    const articles = await Article.findAll();

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { getArticles };
