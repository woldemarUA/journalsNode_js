const fs = require('fs');
const path = require('path');

function deleteFile(relativePath) {
  const filePath = path.join(__dirname, '..', '/public/', relativePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('An error occurred while deleting the file:', err);
    } else {
      console.log('File successfully deleted');
    }
  });
}

module.exports = { deleteFile };
