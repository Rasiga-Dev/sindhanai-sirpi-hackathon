const multer = require('multer');

const storage = multer.memoryStorage(); // file data as buffer
const upload = multer({ storage });

module.exports = upload;
