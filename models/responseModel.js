const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  content: { type: String, required: [true, "Response content is empty"] },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
