const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [
        true,
        "Please enter a password, a valid password must contain at least 8 characters",
      ],
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
