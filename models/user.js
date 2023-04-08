const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // playlist:
    // album:
    // likedSong:

    likedSong: [
      {
        songId: String,
      },
    ],
    role: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    playlist: [
      {
        songId: String,
      },
    ],
  },
  { timestamps: true }
);

// const userSchema = new mongoose({
//   mobileNumber: { type: Number, required: true },
//   verified: Boolean,
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
