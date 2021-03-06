const bcrypt = require("bcrypt");
const read = require("body-parser/lib/read");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.signup = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (
      !email.trim() ||
      !email.trim().includes("@") ||
      !email.trim().split("@")[1].includes(".")
    ) {
      next("Email is not valid");
      return;
    }
    if (!password.trim() || password.trim().length < 8) {
      next("Password is not valid");
      return;
    }

    const user = await User.create({
      email,
      password,
    });

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
  } catch (err) {
    next(err);
  }
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
    const result = await user.verifyPassword(user, password);
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
  } catch (err) {
    console.log(err);
  }
};

exports.isLoggedIn = async function (req, res, next) {
  try {
    const token = req.cookies?.jwt;
    if (!jwt) {
      return next("your are not logged in");
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        if (!decoded) {
          return next("token not valid");
        }

        const user = await User.findById(decoded.id);

        if (!user) {
          next("User not found");
        }

        if (decoded.iat < new Date(user.passwordModifiedAt).getTime() / 1000) {
          next("not valid");
          return;
        }
        req.user = user;
        next();
      }
    );
    return;
  } catch (err) {
    next(err);
  }
};

exports.getUser = async function (req, res, next) {
  const token = req.cookies.jwt;
  if (!jwt) {
    req.user = undefined;
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
    if (!decoded) {
      req.user = undefined;
      return next();
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      req.user = undefined;
      return next();
    }

    req.user = user;
    res.locals.user = user;
    next();
    // return user;
  });
  return;
};
