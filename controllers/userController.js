const bcrypt = require("bcrypt");
const User = require("../models/userModel");
exports.signup = async function (req, res, next) {
  console.log("jjjjj");
  try {
    const { email, password } = req.body;

    if (
      !email.trim() ||
      !email.trim().includes("@") ||
      !email.trim().split("@")[1].includes(".")
    ) {
      return;
    }
    if (!password.trim() || password.trim().length < 8) {
      return;
    }

    bcrypt.hash(password, 12, async function (err, hash) {
      const user = await User.create({ email, password: hash });
      res.status(201).json({
        status: "success",
        data: { user },
      });
    });
  } catch (err) {}
};

exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {}
};
