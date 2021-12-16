const express = require("express");
const favoriteController = require("../controllers/favoriteController");
// const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });
// router.use(authController.isLoggedIn);
router.route("/").post(favoriteController.addFavorite);
//   .get(questionController.getAllQuestions)

module.exports = router;
