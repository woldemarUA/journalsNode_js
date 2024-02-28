const { addArticle } = require('../api_functions/addArticle');
const { updateArticle } = require('../api_functions/updateArticle');
const formUpload = async (req, res) => {
  console.log('13:30');
  try {
    const path = req.route.path;
    let { userId } = req.query;
    const { title, author, description, id } = req.body;
    userId = parseInt(userId, 10); // Ensure userId is an integer

    let image;
    if (req.file) {
      image = req.file.path.slice(req.file.path.indexOf('/') + 1);
    }

    let msg = {}; // Initialize msg object to store the response from add/update operations

    // Check if the operation is to edit an article
    if (path.includes('editArticle') && id) {
      msg = await updateArticle({
        id,
        title,
        author,
        description,
        userId,
        ...(image && { image }), // Conditionally add image to the object if it exists
      });
    } else {
      // Add a new article
      msg = await addArticle({
        title,
        author,
        description,
        userId,
        ...(image && { image }), // Conditionally add image to the object if it exists
      });
    }

    // Send back the response from either addArticle or updateArticle
    res.json(msg);
  } catch (err) {
    console.error('Error uploading/updating the article:', err);
    res.status(500).send('Error uploading/updating article.');
  }
};

module.exports = { formUpload };
