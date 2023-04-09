const { default: mongoose } = require("mongoose");
const Playlist = require("../models/playlist");
const { upload } = require("../utils/multurConfig");

const mongo = require("mongodb");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const router = require("express").Router();

// GET /playlist - return a list of all playlist
const getPlaylist = async (req, res, next) => {
  console.log("Hi getAlbum ============> ");
  const playlist = await Playlist.find();
  console.log("playlist", playlist);
  res.status(200).json(playlist);
};

// POST /playlist - create a new playlist
const createPlaylist = async (req, res, next) => {
  console.log("req body ==============>", req.body);
  console.log("req files ==============>", req.files);
  const { title } = req.body;
  const songs = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
  }));
  const playlist = new Playlist({ title, songs });
  await playlist.save();
  res.json(playlist);
};

// Add a song to an playlist
// router.post("/:id/songs", async (req, res) => {
//   // const song = new Song({
//   //   name: req.body.name,
//   //   artist: req.body.artist,
//   //   album: req.params.id,
//   // });

//   try {
//     // const newSong = await song.save();
//     const playlist = await Playlist.findById(req.params.id);
//     playlist.songs.push(newSong._id);
//     await playlist.save();
//     res.status(201).json(newSong);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Update an Playlist
router.put("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    playlist.name = req.body.name;
    playlist.artist = req.body.artist;
    playlist.releaseDate = req.body.releaseDate;
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an playlist
router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    // await Song.deleteMany({ playlist: playlist._id });
    await playlist.remove();
    res.json({ message: "Album deleted" });
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
  getPlaylist,
  createPlaylist,
  // getAlbumById,
};
