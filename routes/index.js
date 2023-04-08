const express = require("express");
const router = express.Router();
const ID3 = require('id3-parser');
const checkAuth = require("../middleware/checkAuth");
const {
  fetchCurrentUser,
  loginWithOtp,
  registration,
  verifyPhoneOtp,
} = require("../controller/auth");
const { getAlbum, createAlbum } = require("../controller/album");
const { upload } = require("../utils/multurConfig");
const multer = require("multer");

//auth
router.post("/register", registration);
router.post("/login", loginWithOtp);

router.post("/verify", verifyPhoneOtp);

//Album
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     const filename = `${file.originalname}`;
//     cb(null, filename);
//   },
// });
// const upload = multer({ storage });

console.log("upload", upload);

router.get("/albums", getAlbum);

// router.post("/createAlbum", createAlbum);
// router.post("/createAlbum", upload.single('songs'), createAlbum);

router.post("/createAlbum", upload.array('songs'), createAlbum);

module.exports = router;
