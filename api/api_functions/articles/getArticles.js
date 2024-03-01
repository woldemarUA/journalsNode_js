const { Article, User } = require('../../dbModels/dbInit');

async function getArticles() {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        model: User,
        attributes: ['nom'],
      },
    });

    return articles;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = getArticles;
