const { Article, User } = require('../dbModels/dbInit');

async function getArticle(id) {
  try {
    const article = await Article.findByPk(id, {
      include: {
        model: User,
        attributes: ['nom'],
      },
    });

    return article;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getArticle };
