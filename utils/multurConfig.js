const multer = require('multer');


// Configure multer to store uploaded files in the "uploads" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const filename = `${1}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

module.exports = { upload }