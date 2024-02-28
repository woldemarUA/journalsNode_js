const { Article } = require('../dbModels/dbInit');

async function getArticles(req, res) {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']],
    });

    return articles;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getArticles };
