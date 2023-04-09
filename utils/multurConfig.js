const multer = require("multer");

// // Configure multer to store uploaded files in the "uploads" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;

        cb(null, filename.split(" ").join(""));
    },
});

const upload = multer({ storage });
// const upload = multer({ dest: "uploads" });

module.exports = { upload };

// Set up Multer-GridFS-Storage to handle file uploads
// const storage = new GridFsStorage({
//   url: "mongodb://localhost/dhunn",
//   file: (req, file) => {
//     return {
//       bucketName: "songs",
//       metadata: { title: req.body.title, songs: req.body.songs },
//     };
//   },
// });

// const upload = multer({ storage });
// module.exports = { upload };
