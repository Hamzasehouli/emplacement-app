const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 },
        function (err, token) {
          res.cookie("jwt", token);
          res.status(201).json({
            status: "success",
            data: { user },
          });
        }
      );
    });
  } catch (err) {}
};

exports.login = async function (req, res, next) {
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
    const user = await User.findOne({ email });

    if (!user) return;
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 60 * 60 },
          function (err, token) {
            res.cookie("jwt", token);
            res.status(200).json({
              status: "success",
              data: { user },
            });
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};
