const express = require('express');

// const multer = require('multer');
const apiRoutes = require('./routing/apiRouter');
// const { getUsers } = require('./api_functions/getUsers');
// const { getUserDetails } = require('./api_functions/getUserDetails');
// const { deleteUser } = require('./api_functions/deleteUser');
// const { registerUser } = require('./api_functions/registerUser');

// const { deleteArticle } = require('./api_functions/deleteArticle');
// const { formUpload } = require('./utilities/formUpload');

const PORT = 3001;
const app = express();
app.use('/api', apiRoutes);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/articles/add', (req, res) => {
  res.render('articles/addArticle');
});
// app.get('/articles/detail/:id', async (req, res) => {
//   let id = req.params.id;
//   id = parseInt(id, 10);
//   try {
//     const article = await getArticle(id);
//     res.render('articles/article', { article });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ err });
//   }
// });
app.get('/articles/edit', (req, res) => {
  res.render('articles/editArticle');
});

// // app.get('/users/update/:id', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'views/users', 'addUser.html'));
// // });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
