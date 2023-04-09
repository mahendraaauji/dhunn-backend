const express = require("express");
const router = express.Router();
const ID3 = require("id3-parser");
const checkAuth = require("../middleware/checkAuth");
const {
  fetchCurrentUser,
  loginWithOtp,
  registration,
  verifyPhoneOtp,
} = require("../controller/auth");
const { getAlbum, createAlbum, getAlbumById } = require("../controller/album");
// const { upload } = require("../utils/multurConfig");
const multer = require("multer");
const { upload } = require("../utils/multurConfig");

//auth
router.post("/register", registration);
router.post("/login", loginWithOtp);

router.post("/verify", verifyPhoneOtp);


router.get("/albums", getAlbum);

router.post("/createAlbum", upload.array("songs"), createAlbum);

module.exports = router;
