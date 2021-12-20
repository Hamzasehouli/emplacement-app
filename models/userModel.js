const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [
        true,
        "Please enter a password, a valid password must contain at least 8 characters",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordModifiedAt: {
      type: Date,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  if (!hash) return next("could not be hashed");
  this.password = hash;
  this.passwordModifiedAt = new Date();
  next();
});

userSchema.methods.verifyPassword = async function (user, password) {
  const result = await bcrypt.compare(password, user.password);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
