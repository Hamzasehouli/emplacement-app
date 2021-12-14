const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    unique: true,
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
