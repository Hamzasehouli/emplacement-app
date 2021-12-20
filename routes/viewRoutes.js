const express = require("express");
const authController = require("../controllers/authController");
const Question = require("../models/questionModel");
const Favorite = require("../models/favoriteModel");

const router = express.Router();

router.use(authController.getUser);

router.get("/favorites", async (req, res, next) => {
  if (!req.user) {
    res.status(200).render("_login");
    return;
  }
  // const favorites = await Favorite.find([
  //   // {
  //   //   $geoNear: {
  //   //     near: {
  //   //       type: "Point",
  //   //       coordinates: [req.params.lng * 1, req.params.lat * 1],
  //   //     },
  //   //     distanceField: "dist.calculated",
  //   //     maxDistance: 30000,
  //   //     // includeLocs: "dist.location",
  //   //     // spherical: true,
  //   //   },
  //   // },
  //   {
  //     $match: { user: req.user._id },
  //   },
  //   {
  //     $lookup: {
  //       from: "questions",
  //       localField: "question",
  //       foreignField: "_id",
  //       as: "question",
  //     },
  //   },
  //   {
  //     $unwind: "$question",
  //   },
  //   {
  //     $project: { question: 1 },
  //   },
  // ]);

  const favorites = await Favorite.find({
    user: req.user._id,
  }).populate("question");

  // const results = favorites.aggregate([{}]);
  console.log(favorites);
  res.status(200).render("_favorites", {
    title: "Favorite questions",
    favorites,
  });
});
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

router.get("/search/lng/:lng/lat/:lat/page/:page", async (req, res, next) => {
  if (!req.user) {
    res.status(200).render("_login");
    return;
  }

  const questions = await Question.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [req.params.lng * 1, req.params.lat * 1],
        },
        distanceField: "dist.calculated",
        maxDistance: 30000,
        // includeLocs: "dist.location",
        // spherical: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);
  console.log(req.params);
  let page = req.params.page ?? 1;
  const limit = 10;
  const numberOfDocs = questions.length;
  const numberOfPages = Math.ceil(numberOfDocs / limit);
  const skip = limit * (page * 1 - 1);
  console.log(page, "page");
  console.log(skip, "skip");
  console.log(numberOfPages, "numberOfPages");
  console.log(numberOfDocs, "numberOfDocs");
  const rawQuestions = questions.slice(skip, skip + limit);
  console.log(rawQuestions);

  res.status(200).render("_questions", {
    title: "Questions",
    questions: rawQuestions,
    page,
    numberOfPages,
  });
});

router.get("/favorites", async function (req, res, next) {
  if (!req.user) {
    res.status(200).render("_login");
    return;
  }
  const favorites = await Favorite.find({ user: req.user._id }).populate(
    "question"
  );
  console.log(favorites);
  res
    .status(200)
    .render("_favorites", { title: "Favorites", questions: favorites });
});

module.exports = router;
