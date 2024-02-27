const express = require('express');
const path = require('path');
const multer = require('multer');
const { getUsers } = require('./api_functions/getUsers');
const { getUserDetails } = require('./api_functions/getUserDetails');
const { deleteUser } = require('./api_functions/deleteUser');
const { registerUser } = require('./api_functions/registerUser');
const { getArticles } = require('./api_functions/getArticles');

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

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
// *****api*******
// articles api
app.get('/api/articles', getArticles);
app.post('/api/addArticle', upload.single('article-image'), (req, res) => {
  try {
    const { title, author, description } = req.body;
    // const file = req.file ? req.file.path : null;
    let image = req.file.path;
    // str=str.slice(str.indexOf('/')+1)
    image = image.slice(image.indexOf('/') + 1);
    console.log(image);
    res.send('Article and picture uploaded successfully.');
  } catch (err) {
    console.error('Error uploading article:', err);
    res.status(500).send('Error uploading article.');
  }
});

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
    const users = await getUsers();
    res.render('index', { users });
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
// app.get('/users/update/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/users', 'addUser.html'));
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
