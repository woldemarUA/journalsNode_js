const express = require('express');
const path = require('path');
const multer = require('multer');
const { getUsers } = require('./api_functions/getUsers');
const { registerUser } = require('./api_functions/registerUser');

const PORT = 3001;

const upload = multer();

const app = express();
app.use(express.static('public'));

app.get('/api/users', getUsers);
app.post('/api/register', upload.none(), registerUser);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/users/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/users', 'addUser.html'));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
