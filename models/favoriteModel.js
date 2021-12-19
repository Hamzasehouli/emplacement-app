const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
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
      default: Date.now(),
    },
    dist: { type: Number },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// favoriteSchema.virtual("questionn", {
//   ref: "Question",
//   foreignField: "_id",
//   localField: "question",
// });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
