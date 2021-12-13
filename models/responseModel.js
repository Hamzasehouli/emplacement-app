const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schemq.objectId,
  },
  user: {
    type: mongoose.Schemq.objectId,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

const Response = mongoose.model("Question", responseSchema);

module.exports = Response;
