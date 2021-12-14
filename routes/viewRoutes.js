const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("_overview");
});
router.get("/login", (req, res, next) => {
  res.status(200).render("_login");
});
router.get("/signup", (req, res, next) => {
  res.status(200).render("_signup", { title: "Signup" });
});

module.exports = router;
