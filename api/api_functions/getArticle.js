const { Article } = require('../dbModels/dbInit');

async function getArticle(id) {
  try {
    const article = await Article.findByPk(id);
    console.log(article);
    return article;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getArticle };
