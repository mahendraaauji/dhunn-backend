const mongoose = require("mongoose");

// Define the schema for an album document
const albumSchema = new mongoose.Schema({
    title: String,
    songName: String,
    songs: [{
        filename: String,
        originalname: String,
        path: String,
    }],
});

module.exports = mongoose.model('album', albumSchema);