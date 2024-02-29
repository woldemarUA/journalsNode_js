const { Article } = require('../../dbModels/dbInit');

async function addArticle(articleData) {
  try {
    const { title, author, description, userId } = articleData;
    const image = articleData['image']
      ? articleData['image']
      : 'storage/default2.png';
    // if 'storage/default2.png' changed change in deleteArtickle
    const article = await Article.create({
      title,
      author,
      description,
      userId,
      image,
    });

    return { message: 'Votre article était ajoutée avec succes', article };
  } catch (err) {
    console.error(err);
    return { message: 'Erreur ajouter le journals', err };
  }
}

module.exports = { addArticle };
