const express = require('express');
const path = require('path');
const multer = require('multer');
const { getUsers } = require('./api_functions/getUsers');
const { getUserDetails } = require('./api_functions/getUserDetails');
const { deleteUser } = require('./api_functions/deleteUser');
const { registerUser } = require('./api_functions/registerUser');
const { getArticles } = require('./api_functions/getArticles');
const { getArticle } = require('./api_functions/getArticle');
const { deleteArticle } = require('./api_functions/deleteArticle');
const { formUpload } = require('./utilities/formUpload');

const PORT = 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destFolder = 'public/storage/';
    if (req.path.includes('/addArticle')) {
      destFolder = 'public/storage/titleImages/';
    }
    cb(null, destFolder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
// *****api*******
// articles api
app.get('/api/articles/:id', async (req, res) => {
  const id = req.params.id * 1;
  try {
    const article = await getArticle(id);
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.post('/api/addArticle', upload.single('article-image'), formUpload);
app.get('/api/deleteArticle/:id', deleteArticle);
app.post('/api/editArticle', upload.single('article-image'), formUpload);

// USERS API
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/api/users/:id', getUserDetails);
// app.get('/api/users/update/:id', updateUser);
app.get('/api/users/delete/:id', deleteUser);

app.post('/api/register', upload.none(), registerUser);

// *****FRONT END
app.get('/', async (req, res) => {
  try {
    const articles = await getArticles();
    res.render('index', { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
});
app.get('/users/add', (req, res) => {
  res.render('users/addUser');
});
app.get('/articles/add', (req, res) => {
  res.render('articles/addArticle');
});
// app.get('/articles/:id', (req, res) => {
//   res.render('articles/article');
// });
app.get('/articles/edit', (req, res) => {
  res.render('articles/editArticle');
});

// app.get('/users/update/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/users', 'addUser.html'));
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
