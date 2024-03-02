const { Article, User } = require('../../dbModels/dbInit');
// userId, isApproved
async function fetchApprovedArticles() {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']],
      where: { isApproved: true },
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

async function fetchPendingApprovalArticles() {
  try {
    const articles = await Article.findAll({
      where: { isApproved: false },
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

async function changeStatus(id) {
  try {
    const msg = await Article.update(
      { isApproved: true },
      {
        where: { id: id },
      }
    );
    return msg;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function fetchUserArticles(userId) {
  try {
    const articles = await Article.findAll({ where: { userId } });
    return articles;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  fetchApprovedArticles,
  fetchPendingApprovalArticles,
  changeStatus,
  fetchUserArticles,
};
