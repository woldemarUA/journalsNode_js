const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destFolder = 'public/storage/';
    console.log(req.path);
    if (req.path.includes('/addArticle') || req.path.includes('/editArticle')) {
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

module.exports = { upload };
