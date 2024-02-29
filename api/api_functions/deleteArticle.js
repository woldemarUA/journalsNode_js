const { Article } = require('../dbModels/dbInit');
const { deleteFile } = require('../utilities/fileDelete');

async function deleteArticle(req, res) {
  let id = req.params.id;
  id = parseInt(id, 10);

  try {
    const image = await Article.findByPk(id, {
      attributes: ['image'],
    });
    console.log('TROUVER IMAGE *********');
    if (!image['image'].includes('default')) deleteFile(image['image']);
    const response = await Article.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ response, msg: 'Votre journal était supprime' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { deleteArticle };
