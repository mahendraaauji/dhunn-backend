const Album = require("../models/album");
const Song = require("../models/song");
const { upload } = require("../utils/multurConfig");

const router = require("express").Router();

// // Add an album
// router.post("/createAlbum", async (req, res) => {
//     const newAlbum = Album({
//         name: req.body.name,
//         artist: req.body.artist,
//         // imageURL:req.body.artist
//         songs: []
//     });
//     try {
//         const savedAlbum = await newAlbum.save();
//         res.status(200).send({ album: savedAlbum });
//     } catch (error) {
//         res.status(400).send({ success: false, msg: error });
//     }
// });

// // Add a song to an album
// router.post('/:id/songs', async (req, res) => {
//     const song = new Song({
//         name: req.body.name,
//         artist: req.body.artist,
//         album: req.params.id
//     });

//     try {
//         const newSong = await song.save();
//         const album = await Album.findById(req.params.id);
//         album.songs.push(newSong._id);
//         await album.save();
//         res.status(201).json(newSong);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// })


// // Update an album
// router.put('/:id', async (req, res) => {
//     try {
//         const album = await Album.findById(req.params.id);
//         album.name = req.body.name;
//         album.artist = req.body.artist;
//         album.releaseDate = req.body.releaseDate;
//         await album.save();
//         res.json(album);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Delete an album
// router.delete('/:id', async (req, res) => {
//     try {
//         const album = await Album.findById(req.params.id);
//         await Song.deleteMany({ album: album._id });
//         await album.remove();
//         res.json({ message: 'Album deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get all songs for an album
// router.get('/:id/songs', async (req, res) => {
//     try {
//         const album = await Album.findById(req.params.id).populate('songs');
//         res.json(album.songs);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });



// // router.get("/getOne/:getOne", async (req, res) => {
// //     const filter = { _id: req.params.getOne };

// //     const cursor = await album.findOne(filter);
// //     console.log(cursor);
// //     if (cursor) {
// //         res.status(200).send({ success: true, data: cursor });
// //     } else {
// //         res.status(200).send({ success: true, msg: "No Data Found" });
// //     }
// // });

// // router.put("/update/:updateId", async (req, res) => {
// //     const filter = { _id: req.params.updateId };
// //     const options = {
// //         upsert: true,
// //         new: true,
// //     };
// //     try {
// //         const result = await album.findOneAndUpdate(
// //             filter,
// //             {
// //                 name: req.body.name,
// //                 imageURL: req.body.imageURL,
// //             },
// //             options
// //         );
// //         res.status(200).send({ album: result });
// //     } catch (error) {
// //         res.status(400).send({ success: false, msg: error });
// //     }
// // });

// // router.delete("/delete/:deleteId", async (req, res) => {
// //     const filter = { _id: req.params.deleteId };

// //     const result = await album.deleteOne(filter);
// //     if (result.deletedCount === 1) {
// //         res.status(200).send({ success: true, msg: "Data Deleted" });
// //     } else {
// //         res.status(200).send({ success: false, msg: "Data Not Found" });
// //     }
// // });

// module.exports = router;


// Define the API routes

// GET /albums - return a list of all albums

const getAlbum = async (req, res, next) => {
    const albums = await Album.find();
    res.json(albums);
};

// POST /albums - create a new album

const createAlbum = async (req, res, next) => {
    console.log("req body ==============>", req.body)

    console.log("req files ==============>", req.files)

    const { title } = req.body;
    const songs = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
    }));
    const album = new Album({ title, songs });
    await album.save();
    res.json(album);
}


module.exports = {
    getAlbum,
    createAlbum
}
