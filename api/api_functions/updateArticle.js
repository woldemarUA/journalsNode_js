const { Article } = require('../dbModels/dbInit');

async function updateArticle(articleData) {
  try {
    console.log('serveur article edit');
    const { id, title, author, description, userId, image } = articleData;

    // Directly use all articleData fields, conditionally include image only if it exists
    const updateData = {
      title,
      author,
      description,
      userId,
      ...(image && { image }), // This will include image only if it is truthy
    };

    const [updatedRows] = await Article.update(updateData, {
      where: { id: id },
    });

    // `updatedRows` will contain the number of rows affected by the update operation
    if (updatedRows) {
      return { message: 'Votre article a été mis à jour avec succès' };
    } else {
      return { message: 'Aucun article trouvé avec cet ID pour mettre à jour' };
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'article:", err);
    return { message: "Erreur lors de la mise à jour de l'article", err };
  }
}

module.exports = { updateArticle };

// const { Article } = require('../dbModels/dbInit');

// async function updateArticle(articleData) {
//   try {
//     console.log('serveur articfle edit ');
//     const { id, title, author, description, userId } = articleData;
//     const articleObj = articleData['image']
//       ? { id, title, author, description, userId ,  articleData.image}
//       : { id, title, author, description, userId };
//     const article = await Article.update(
//       {
//         title,
//         author,
//         description,
//         userId,
//         image,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     return { message: 'Votre article était ajoutée avec succes', article };
//   } catch (err) {
//     console.error(err);
//     return { message: 'Erreur ajouter le journals', err };
//   }
// }

// module.exports = { updateArticle };
