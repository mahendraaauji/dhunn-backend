const { default: mongoose } = require("mongoose");
const Album = require("../models/album");
// const Song = require("../models/playlist");
const { upload } = require("../utils/multurConfig");

const mongo = require("mongodb");
const multer = require("multer");

const router = require("express").Router();

// GET /albums - return a list of all albums
const getAlbum = async (req, res, next) => {
  console.log("Hi getAlbum ============> ");
  const albums = await Album.find();
  console.log("albums", albums);
  res.status(200).json(albums);
};

// POST /albums - create a new album
const createAlbum = async (req, res, next) => {
  console.log("req body ==============>", req.body);
  console.log("req files ==============>", req.files);

  const { title, songName } = req.body;

  const songs = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
  }));
  const album = new Album({ title, songName, songs });
  await album.save();
  res.status(200).json(album);
};

// // Add a song to an album
// router.post("/:id/songs", async (req, res) => {
//   const song = new Song({
//     name: req.body.name,
//     artist: req.body.artist,
//     album: req.params.id,
//   });

//   try {
//     const newSong = await song.save();
//     const album = await Album.findById(req.params.id);
//     album.songs.push(newSong._id);
//     await album.save();
//     res.status(201).json(newSong);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Update an album
router.put("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    album.name = req.body.name;
    album.artist = req.body.artist;
    album.releaseDate = req.body.releaseDate;
    await album.save();
    res.status(200).json(album);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an album
router.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    // await Song.deleteMany({ album: album._id });
    await album.remove();
    res.status(200).json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get all songs for an album
// router.get('/:id/songs', async (req, res) => {
//     try {
//         const album = await Album.findById(req.params.id).populate('songs');
//         res.json(album.songs);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

module.exports = {
  getAlbum,
  createAlbum,
  // getAlbumById,
};
