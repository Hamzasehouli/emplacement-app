const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
  dist: {
    type: Number,
  },
});

// favoriteSchema.index({ location: "2dsphere" });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
