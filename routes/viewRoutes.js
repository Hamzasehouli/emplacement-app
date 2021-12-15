const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("_overview", { title: "Home" });
});
router.get("/login", (req, res, next) => {
  res.status(200).render("_login", { title: "Login" });
});
router.get("/signup", (req, res, next) => {
  res.status(200).render("_signup", { title: "Sign up" });
});
router.get("/ask", (req, res, next) => {
  res.status(200).render("_askquestion", { title: "Add a question" });
});
router.get("/search", (req, res, next) => {
  res.status(200).render("_questions", { title: "Search questions" });
});

module.exports = router;
