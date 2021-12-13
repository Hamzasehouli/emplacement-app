const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  location: {
    type: {},
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
  responses: {
    type: [mongoose.Schema.ObjectId],
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
