const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
  fetchCurrentUser,
  loginWithOtp,
  registration,
  verifyPhoneOtp,
} = require("../controller/auth");
const { getAlbum, createAlbum } = require("../controller/album");
const { upload } = require("../utils/multurConfig");

//auth
router.post("/register", registration);
router.post("/login", loginWithOtp);

router.post("/verify", verifyPhoneOtp);

//Album
router.get("/albums", getAlbum);
router.post("/createAlbum", upload.array('songs'), createAlbum);



router.get("/me", checkAuth, fetchCurrentUser);

module.exports = router;
