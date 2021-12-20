const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  content: { type: String, required: [true, "Response content is empty"] },
});

responseSchema.pre("find", function (next) {
  this.populate("user");
  next();
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
