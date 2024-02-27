const { Article } = require('../dbModels/dbInit');

async function getArticles() {
  //res, req

  try {
    const articles = await Article.findAll();
    console.log(articles);
    // res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    // res.sendStatus(500);
  }
}

getArticles();

module.exports = { getArticles };
