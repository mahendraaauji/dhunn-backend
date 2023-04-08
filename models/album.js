const mongoose = require("mongoose");

// const albumSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },

//         imageURL: {
//             type: String,
//             required: true,
//         },
//         songs: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Song'
//         }]
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("album", albumSchema);

// Define the schema for an album document
const albumSchema = new mongoose.Schema({
    title: String,
    songs: [{
        filename: String,
        originalname: String,
        path: String,
    }],
});

module.exports = mongoose.model('album', albumSchema);