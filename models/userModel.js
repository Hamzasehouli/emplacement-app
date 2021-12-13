const mongoose = require("mongoose");
const bcrypt = require(bcrypt);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// userSchema.pre("save", () => {
//     bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//         // Store hash in your password DB.
//     });
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
