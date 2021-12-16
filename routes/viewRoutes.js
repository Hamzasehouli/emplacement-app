const express = require("express");
const authController = require("../controllers/authController");
const Question = require("../models/questionModel");

const router = express.Router();

router.use(authController.getUser);

router.get("/", (req, res, next) => {
  res.status(200).render("_overview", { title: "Home" });
});
router.get("/login", (req, res, next) => {
  if (req.user) {
    res.status(200).render("_overview");
    return;
  }
  res.status(200).render("_login", { title: "Login" });
});
router.get("/signup", (req, res, next) => {
  if (req.user) {
    res.status(200).render("_overview");
    return;
  }
  res.status(200).render("_signup", { title: "Sign up" });
});
router.get("/ask", (req, res, next) => {
  if (!req.user) {
    res.status(200).render("_login");
    return;
  }
  res
    .status(200)
    .render("_askquestion", { title: "Add a question", userId: req.user.id });
});
router.get("/search", async (req, res, next) => {
  if (!req.user) {
    res.status(200).render("_login");
    return;
  }
  const questions = await Question.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [-5.825412956034679, 35.746303550878864],
        },
        distanceField: "dist.calculated",
        maxDistance: 0.0015678503,
        // includeLocs: "dist.location",
        // spherical: true,
      },
    },
  ]);
  console.log(questions);
  res.status(200).render("_questions", { title: "Search questions" });
});

module.exports = router;
