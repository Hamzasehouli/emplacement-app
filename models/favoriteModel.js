const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
  },
  question: {
    type: mongoose.Schema.ObjectId,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
