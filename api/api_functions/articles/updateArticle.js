const { Article } = require('../../dbModels/dbInit');

async function updateArticle(articleData) {
  try {
    console.log('serveur article edit');
    const { id, title, author, description, userId, username, image } =
      articleData;

    const updateData = {
      title,
      author,
      description,
      userId,
      username,
      ...(image && { image }),
    };

    const [updatedRows] = await Article.update(updateData, {
      where: { id: id },
    });

    if (updatedRows) {
      return {
        message: 'Votre article a été mis à jour avec succès',
        article: articleData,
      };
    } else {
      return { message: 'Aucun article trouvé avec cet ID pour mettre à jour' };
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'article:", err);
    return { message: "Erreur lors de la mise à jour de l'article", err };
  }
}

module.exports = { updateArticle };
